import { Routes } from '@angular/router';
import { PanelInferiorComponent } from './components/panel-inferior/panel-inferior.component';

export const routes: Routes = [
  {
    path: 'tab',
    component: PanelInferiorComponent,
    children: [
      { path: `inicio`,
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'consejos',
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/consejos/consejos.page').then(m => m.ConsejosPage)
          },
          {
            path: 'id',
            loadComponent: () => import('./pages/consejos/mostrar-consejo/mostrar-consejo.page').then(m => m.MostrarConsejoPage)
          }
        ]
      },
      { path: `calendario`,
        loadComponent: () => import('./pages/calendario/calendario.page').then( m => m.CalendarioPage),
      },
      { path: `sucursales`,
        loadComponent: () => import('./pages/sucursales/sucursales.page').then((m) => m.SucursalesPage),
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tab/inicio',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'consejos',
    loadComponent: () => import('./pages/consejos/consejos.page').then( m => m.ConsejosPage)
  },
  {
    path: 'calendario',
    loadComponent: () => import('./pages/calendario/calendario.page').then( m => m.CalendarioPage)
  },
  {
    path: 'sucursales',
    loadComponent: () => import('./pages/sucursales/sucursales.page').then( m => m.SucursalesPage)
  },
  {
    path: 'mostrar-consejo',
    loadComponent: () => import('./pages/consejos/mostrar-consejo/mostrar-consejo.page').then( m => m.MostrarConsejoPage)
  },
];
