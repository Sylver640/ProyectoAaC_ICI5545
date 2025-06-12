import { Component, OnInit } from '@angular/core';
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
  actividad: any = {
    nombre: '',
    ubicacion: '',
    fecha: '',
    descripcion: '',
  };

  actividades: any[] = []; //array de actividades
  actividadActual: number = 0;

  constructor (private router: Router,private alertCtrl: AlertController){}

  ngOnInit() {
    const datos = localStorage.getItem('actividades');
    this.actividades = datos ? JSON.parse(datos) : [];
  }

  onDateChange(event: any) {
    const fecha = new Date(event.detail.value);
    const dia = fecha.getDate();
    const mes = fecha.toLocaleString('es-ES', { month: 'long' });
    const año = fecha.getFullYear();

    this.actividad.fecha = `${dia} ${mes} ${año}`;

    // Aquí podrías buscar la actividad real según la fecha
    console.log('Fecha seleccionada:', this.actividad.fecha);
  }

  prevActividad() {
    console.log('Anterior actividad');
  }

  nextActividad() {
    console.log('Siguiente actividad');
  }

  confirmarActividad() {
    console.log('Confirmada');
  }

  editarActividad() {
    console.log('editar actividad');
  }

  eliminarActividad() {
    if (this.actividades.length === 0) return;

    // Eliminar la actividad actual directamente (sin confirm)
    this.actividades.splice(this.actividadActual, 1);

    // Ajustar el índice actual si es necesario
    if (this.actividadActual >= this.actividades.length) {
      this.actividadActual = Math.max(0, this.actividades.length - 1);
    }

    // Guardar en localStorage
    localStorage.setItem('actividades', JSON.stringify(this.actividades));

    console.log('Actividad eliminada');
  }

  async confirmarEliminacionActividad() {
    const actividad = this.actividades[this.actividadActual];

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
    console.log('Agregar nueva actividad');
    this.router.navigate(['/edit-control']);
  }
}
