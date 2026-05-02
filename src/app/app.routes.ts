import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/products/pages/lista-productos/lista-productos.component')
        .then(m => m.ListaProductosComponent)
  },
  {
    path: 'products/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/products/pages/form-productos/form-productos.component')
        .then(m => m.FormProductosComponent)
  },
  {
    path: 'products/edit/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/products/pages/form-productos/form-productos.component')
        .then(m => m.FormProductosComponent)
  }
];
