import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Item, ItemService } from './item.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [NgFor, NgTemplateOutlet, AsyncPipe, NgIf, RouterLink, RouterOutlet],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent implements OnInit {
  constructor(private service: ItemService) {
    this.service = service;
  }

  item$!: Observable<Item[] | undefined>;

  ngOnInit(): void {
    this.item$ = this.service.getItems();
  }

  async getItems() {
    const items = await this.service.getItems();
    console.log(items)
    return items
  }

  deleteItem(id: number) {
    return this.service.deleteItem(id).subscribe(() => {
      this.item$ = this.service.getItems()
    })
  }
}
