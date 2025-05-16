import { Routes } from '@angular/router';
import { ItemComponent } from './item/item.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'items' },
  {
    path: 'items',
    loadChildren: () => import('./item/item.module').then((m) => m.ItemModule),
  },
];
