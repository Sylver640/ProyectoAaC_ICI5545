import { Routes } from '@angular/router';
import { PanelInferiorComponent } from './components/panel-inferior/panel-inferior.component';

export const routes: Routes = [
  {
    path: 'test_tab',
    component: PanelInferiorComponent,
    children: [
      { path: `home`,
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
      },
      { path: `consejos`,
        loadComponent: () => import('./pages/consejos/consejos.page').then((m) => m.ConsejosPage),
      }
    ]
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'test_tab/home',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'consejos',
    loadComponent: () => import('./pages/consejos/consejos.page').then( m => m.ConsejosPage)
  },

];
