import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './item.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemInfoComponent } from './item-info/item-info.component';
import { ItemUpdateComponent } from './item-update/item-update.component';

const routes: Routes = [
  { path: '', component: ItemComponent },
  { path: 'create', component: ItemFormComponent },
  { path: ':id', component: ItemInfoComponent },
  { path: ':id/update', component: ItemUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemRoutingModule { }
