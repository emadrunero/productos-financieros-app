import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/pages/lista-productos/lista-productos.component')
        .then(m => m.ListaProductosComponent)
  },
  {
    path: 'products/new',
    loadComponent: () =>
      import('./features/products/pages/form-productos/form-productos.component')
        .then(m => m.FormProductosComponent)
  },
  {
    path: 'products/edit/:id',
    loadComponent: () =>
      import('./features/products/pages/form-productos/form-productos.component')
        .then(m => m.FormProductosComponent)
  }
];
