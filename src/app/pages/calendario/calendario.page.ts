import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    IonLabel
  ]
})
export class CalendarioPage {
  actividad: any = {
    nombre: '',
    ubicacion: '',
    fecha: '',
    descripcion: '',
  };

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
    console.log('editar cctividad');
  }

  agregarActividad() {
    console.log('Agregar nueva actividad');
  }
}
