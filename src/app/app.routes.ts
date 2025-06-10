import { Routes } from '@angular/router';
import { PanelInferiorComponent } from './components/panel-inferior/panel-inferior.component';

export const routes: Routes = [
  {
<<<<<<< HEAD
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
=======
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
            path: ':id',
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
>>>>>>> 395800b4d22552317da6168d09ded670f178b561
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
<<<<<<< HEAD
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.page').then( m => m.PerfilPage)
=======
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
>>>>>>> 395800b4d22552317da6168d09ded670f178b561
  },
];
