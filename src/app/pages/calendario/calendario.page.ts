import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PanelSuperiorComponent } from 'src/app/components/panel-superior/panel-superior.component';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonDatetime,
  IonLabel
} from '@ionic/angular/standalone';



@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonFooter,
    IonTabBar,
    IonIcon,
    IonDatetime,
    IonTabButton,
    IonLabel,
    PanelSuperiorComponent
  ]
})
export class CalendarioPage {
  actividad: any = null;


  actividades: any[] = [];
  actividadesDelDia: any[] = [];
  actividadActual: number = 0;
  fechaSeleccionada: string = ''; // formato ISO

  constructor (private router: Router,private alertCtrl: AlertController,private cdr: ChangeDetectorRef){}

  ngOnInit() {
    this.cargarActividades();  // Recargar actividades cada vez que se acceda al calendario
  }

  ionViewWillEnter() {
    // Recargar actividades cada vez que la página se muestra
    const datos = localStorage.getItem('actividades');
    this.actividades = datos ? JSON.parse(datos) : [];
    console.log('Actividades recargadas:', this.actividades);
  }

  cargarActividades() {
    const datos = localStorage.getItem('actividades');
    this.actividades = datos ? JSON.parse(datos) : [];
    console.log('Actividades cargadas:', this.actividades);
  }

  formatFecha(fechaISO: string): string {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate();
    const mes = fecha.toLocaleString('es-ES', { month: 'long' });
    const año = fecha.getFullYear();
    return `${dia} ${mes} ${año}`;
  }

  onDateChange(event: any) {
    const fechaISO = event.detail.value?.split('T')[0]; // extraer solo la parte YYYY-MM-DD
    this.fechaSeleccionada = fechaISO;

    // Filtrar actividades de ese día
    this.actividadesDelDia = this.actividades.filter(
      act => act.fechaISO === fechaISO
    );

    console.log('Actividades del día:', this.actividadesDelDia);

    if (this.actividadesDelDia.length > 0) {
      this.actividadActual = 0;
      this.actividad = this.actividadesDelDia[0];
    } else {
      this.actividad = null;
    }

    console.log('Fecha seleccionada:', this.fechaSeleccionada);
  }

  prevActividad() {
    if (this.actividadesDelDia.length === 0) return;

    this.actividadActual =
      (this.actividadActual - 1 + this.actividadesDelDia.length) %
      this.actividadesDelDia.length;

    this.actividad = this.actividadesDelDia[this.actividadActual];
  }

  nextActividad() {
    if (this.actividadesDelDia.length === 0) return;

    this.actividadActual =
      (this.actividadActual + 1) % this.actividadesDelDia.length;

    this.actividad = this.actividadesDelDia[this.actividadActual];
  }

  confirmarActividad() {
    console.log('Confirmada');
  }

  editarActividad(id: number) {
    this.router.navigate(['/edit-actividad', id]);
  }

  eliminarActividad() {
    const actividadAEliminar = this.actividadesDelDia[this.actividadActual];

    this.actividades = this.actividades.filter(
      act => act !== actividadAEliminar
    );

    // Guardar en localStorage
    localStorage.setItem('actividades', JSON.stringify(this.actividades));

    // Volver a filtrar actividades del día actual
    this.actividadesDelDia = this.actividades.filter(
      act => act.fechaISO === this.fechaSeleccionada
    );

    if (this.actividadesDelDia.length > 0) {
      this.actividadActual = 0;
      this.actividad = this.actividadesDelDia[0];
    } else {
      this.actividad = null;
    }

    console.log('Actividad eliminada');
  }

  async confirmarEliminacionActividad() {
    if (!this.actividades || this.actividades.length === 0) {
      console.warn('No hay actividades para eliminar');
      return;
    }

    const actividad = this.actividades[this.actividadActual];

    if (!actividad) {
      console.warn('Índice fuera de rango o actividad no definida');
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Eliminar actividad',
      message: `¿Deseas eliminar la actividad "${actividad.nombre}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sí, eliminar',
          handler: () => this.eliminarActividad()
        }
      ]
    });

    await alert.present();
  }

  agregarActividad() {
    if (!this.fechaSeleccionada) return;
    localStorage.setItem('fechaSeleccionada', this.fechaSeleccionada);
    this.router.navigate(['/edit-control']);
  }

  actualizarCalendario() {
    this.cargarActividades(); // Recargamos las actividades
    this.cdr.detectChanges();  // Forzamos la actualización de la vista
  }
}
