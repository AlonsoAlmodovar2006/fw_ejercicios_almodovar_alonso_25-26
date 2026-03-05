import { Routes } from '@angular/router';
import { Layout } from './c_layout/layout/layout';
export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [],
  },
];
