import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {
  perfil: any = {};
  edadTexto: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { perfil: any };
    if (state?.perfil) {
      this.perfil = state.perfil;
      this.edadTexto = this.calcularEdad(this.perfil.fechaNacimiento);
    }
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
