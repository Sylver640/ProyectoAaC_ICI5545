import { Component,importProvidersFrom,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { PanelSuperiorComponent} from 'src/app/components/panel-superior/panel-superior.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, PanelSuperiorComponent],
  standalone: true
})

export class HomePage implements OnInit {
  perfil: any = {};
  edadTexto: string = '';

  constructor(private router: Router) {}

  ngOnInit() {

    this.cargarPerfil();
    if (this.perfil.fechaNacimiento) {
      this.edadTexto = this.calcularEdad(this.perfil.fechaNacimiento);
    } else {
      this.edadTexto = 'Fecha de nacimiento no disponible';
    }
  }

  cargarPerfil() {
    const data = localStorage.getItem('perfilSeleccionado');
    this.perfil = data ? JSON.parse(data) : [];
  }

  goBack() {
    this.router.navigate(['/perfil']);
  }

  calcularEdad(fechaNacimiento: string): string {
    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();
    let años = hoy.getFullYear() - fechaNac.getFullYear();
    let meses = hoy.getMonth() - fechaNac.getMonth();

    if (meses < 0) {
      años--;
      meses += 12;
    }

    return `${años} año${años !== 1 ? 's' : ''} y ${meses} mes${meses !== 1 ? 'es' : ''}`;
  }

  irContactos(){
    this.router.navigate(['/contactos']);
  }
  irNotificaciones(){

  }
}
