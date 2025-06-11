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
    // Primero tratamos de obtener el perfil desde el estado de la navegación
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { perfil: any };
    
    if (state?.perfil) {
      // Si el perfil está en el estado de la navegación, lo usamos
      this.perfil = state.perfil;
    } else {
      // Si no, intentamos obtener el perfil desde localStorage
      const perfilGuardado = localStorage.getItem('perfilSeleccionado');
      if (perfilGuardado) {
        // Si el perfil está en localStorage, lo usamos
        this.perfil = JSON.parse(perfilGuardado);
      } else {
        // Si no hay perfil guardado, redirigimos a la página de selección de perfil
        console.error('No se encontró un perfil guardado');
        this.router.navigate(['/perfil']);
      }
    }
  
    // Si el perfil tiene fecha de nacimiento, calculamos la edad
    if (this.perfil && this.perfil.fechaNacimiento) {
      this.edadTexto = this.calcularEdad(this.perfil.fechaNacimiento);
    }
  }

  goBack() {
    this.router.navigate(['/perfil']);
  }

  calcularEdad(fechaNacimiento: string): string {
    const fechaNac = new Date(fechaNacimiento);
  
    // Verificamos que la fecha sea válida
    if (isNaN(fechaNac.getTime())) {
      console.error('Fecha de nacimiento inválida:', fechaNacimiento);
      return 'Edad desconocida';
    }
  
    const hoy = new Date();
    let años = hoy.getFullYear() - fechaNac.getFullYear();
    let meses = hoy.getMonth() - fechaNac.getMonth();
  
    
    if (meses < 0) {
      años--;
      meses += 12;
    }
  
    // Aseguramos que devuelva el formato correcto
    return `${años} año${años !== 1 ? 's' : ''} y ${meses} mes${meses !== 1 ? 'es' : ''}`;
  }

  irContactos(){
    this.router.navigate(['/contactos']);
  }
  irNotificaciones(){
    
  }
}
