import { Component,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonText } from '@ionic/angular/standalone';
import { PanelSuperiorComponent} from 'src/app/components/panel-superior/panel-superior.component';
import { HitoService } from 'src/app/services/hitos.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, PanelSuperiorComponent,IonCard,IonCardHeader,IonCardTitle,IonCardContent,CommonModule,IonText],
  standalone: true
})

export class HomePage implements OnInit {
  perfil: any = {};
  edadTexto: string = '';
  rangoEdad: string = '';
  hitos: string[] = [];
  actividadProxima: any = null;

  constructor(private router: Router,private hitoService: HitoService) {}

  ngOnInit() {

    this.cargarPerfil();
    if (this.perfil.fechaNacimiento) {
      this.edadTexto = this.calcularEdad(this.perfil.fechaNacimiento);
    } else {
      this.edadTexto = 'Fecha de nacimiento no disponible';
    }
    const data = localStorage.getItem('perfilSeleccionado');
    this.perfil = data ? JSON.parse(data) : {};
    this.rangoEdad = this.obtenerRangoEdad(this.perfil.fechaNacimiento);
    this.cargarHitos();
    this.buscarActividadProxima();
  }

  formatFecha(fechaISO: string): string {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate();
    const mes = fecha.toLocaleString('es-ES', { month: 'long' });
    const año = fecha.getFullYear();
    return `${dia} ${mes} ${año}`;
  }

  buscarActividadProxima() {
    const datos = localStorage.getItem('actividades');
    if (!datos) return;
  
    const actividades = JSON.parse(datos);
  
    const hoy = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
    // Ordenar por fecha futura más cercana
    const proximas = actividades
      .filter((a: any) => a.fechaISO >= hoy)
      .sort((a: any, b: any) => a.fechaISO.localeCompare(b.fechaISO));
  
    this.actividadProxima = proximas.length > 0 ? proximas[0] : null;
  }

  obtenerRangoEdad(fechaNacimiento: string): string {
    if (!fechaNacimiento) return '';

    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();
    let años = hoy.getFullYear() - nacimiento.getFullYear();
    let meses = hoy.getMonth() - nacimiento.getMonth();

    if (meses < 0) {
      años--;
      meses += 12;
    }

    const totalMeses = años * 12 + meses;

    if (totalMeses <= 6) return "0-6 meses";
    if (totalMeses <= 12) return "7-12 meses";
    if (totalMeses <= 23) return "13-23 meses";
    if (totalMeses <= 60) return "2-5 años";
    if (totalMeses <= 120) return "6-10 años";
    return "Fuera de rango";
  }

  cargarHitos() {
    if (this.rangoEdad === 'Fuera de rango') return;

    this.hitoService.listarHitosPorEdad(this.rangoEdad).subscribe({
      next: (data) => this.hitos = data,
      error: (err) => console.error('Error al cargar hitos:', err)
    });
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
