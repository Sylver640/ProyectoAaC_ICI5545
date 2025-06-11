import { Routes } from '@angular/router';
import { PanelInferiorComponent } from './components/panel-inferior/panel-inferior.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'tab',
    component: PanelInferiorComponent,
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'consejos',
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/consejos/consejos.page').then(m => m.ConsejosPage),
          },
          {
            path: ':id',
            loadComponent: () => import('./pages/consejos/mostrar-consejo/mostrar-consejo.page').then(m => m.MostrarConsejoPage),
          },
        ],
      },
      {
        path: 'calendario',
        loadComponent: () => import('./pages/calendario/calendario.page').then(m => m.CalendarioPage),
      },
      {
        path: 'sucursales',
        loadComponent: () => import('./pages/sucursales/sucursales.page').then((m) => m.SucursalesPage),
      },
    ],
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.page').then(m => m.InicioPage),
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.page').then(m => m.PerfilPage),
  },
  {
    path: 'consejos',
    loadComponent: () => import('./pages/consejos/consejos.page').then(m => m.ConsejosPage),
  },
  {
    path: 'calendario',
    loadComponent: () => import('./pages/calendario/calendario.page').then(m => m.CalendarioPage),
  },
  {
    path: 'sucursales',
    loadComponent: () => import('./pages/sucursales/sucursales.page').then(m => m.SucursalesPage),
  },
  {
    path: 'mostrar-consejo',
    loadComponent: () => import('./pages/consejos/mostrar-consejo/mostrar-consejo.page').then(m => m.MostrarConsejoPage),
  },
  {
    path: 'campos-infante',
    loadComponent: () => import('./pages/campos-infante/campos-infante.page').then( m => m.CamposInfantePage)
  },
  {
    path: 'configuracion',
    loadComponent: () => import('./pages/configuracion/configuracion.page').then( m => m.ConfiguracionPage)
  },
  {
    path: 'editar-perfil',
    loadComponent: () => import('./pages/editar-perfil/editar-perfil.page').then( m => m.EditarPerfilPage)
  },  {
    path: 'edit-control',
    loadComponent: () => import('./pages/edit-control/edit-control.page').then( m => m.EditControlPage)
  },
  {
    path: 'contactos',
    loadComponent: () => import('./pages/contactos/contactos.page').then( m => m.ContactosPage)
  },



];