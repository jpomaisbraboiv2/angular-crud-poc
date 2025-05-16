import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Item, ItemService } from '../item/item.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FormComponent, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Input() formType = ''

  methods: { [key: string]: () => void };

  itemForm: FormGroup;
  private initialValues!: Item
  public error: string = '';

  constructor(
    private fb: FormBuilder,
    private service: ItemService,
    private router: Router,
    private activatedRouted: ActivatedRoute,

  ) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });

    this.methods = {
      create: this.create.bind(this),
      update: this.update.bind(this),
    };

    this.activatedRouted.params.subscribe((p) => {
      if (!p || !p['id']) return

      this.service.getItemById(p['id']).subscribe((item: Item | undefined) => {
        if (!item) return

        this.initialValues = item;

        this.itemForm.patchValue({
          name: item.name,
          description: item.description,
          price: item.price,
        });
      });
    });
  }

  sendForm() {
    return this.methods[this.formType]()
  }

  create() {
    this.service.addItem(this.itemForm.value).subscribe(success => {
      if (!success) return false

      return true
    });

    this.router.navigate(['/items']);
  }

  update() {
    this.service.updateItem(this.initialValues['id'], this.itemForm.value).subscribe(success => {
      if (!success) return false

      return true
    });

    this.router.navigate(['/items']);
  }
}
