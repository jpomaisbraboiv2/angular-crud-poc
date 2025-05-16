import { NgModule } from '@angular/core';
import { ItemComponent } from './item.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemRoutingModule } from './item-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemInfoComponent } from './item-info/item-info.component';
import { ItemUpdateComponent } from './item-update/item-update.component';

@NgModule({
  declarations: [],
  imports: [
    ItemRoutingModule,
    ItemComponent,
    ReactiveFormsModule,
    ItemInfoComponent,
    ItemFormComponent,
    ItemUpdateComponent
  ],
})
export class ItemModule { }
