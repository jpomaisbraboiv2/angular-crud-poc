import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormComponent } from 'src/app/form/form.component';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterOutlet, FormComponent],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css',
})
export class ItemFormComponent {
  itemForm: FormGroup;

  public error: string = '';

  constructor(
    private fb: FormBuilder,
    private service: ItemService,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
    });
  }

  addItem() {
    this.service.addItem(this.itemForm.value).subscribe(success => {
      if (!success) return false

      return true
    });

    this.router.navigate(['/items']);
  }
}
