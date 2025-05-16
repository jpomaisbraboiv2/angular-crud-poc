import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item, ItemService } from '../item.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-info',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './item-info.component.html',
  styleUrl: './item-info.component.css',
})
export class ItemInfoComponent implements OnInit {
  itemId = 0;
  item$!: Observable<Item | undefined>

  constructor(
    private activatedRouted: ActivatedRoute,
    private service: ItemService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.activatedRouted.params.subscribe((p) => {
      this.itemId = Number(p['id']);
      this.item$ = this.service.getItemById(this.itemId) || undefined
    });
  }

  deleteItem(id: number) {
    this.service.deleteItem(id).subscribe(() => {
      return
    })

    this.router.navigate(['/items'])
  }
}
