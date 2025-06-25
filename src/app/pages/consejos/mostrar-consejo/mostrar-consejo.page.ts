import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SugerenciasService } from 'src/app/services/sugerencias.service';
import { ActivatedRoute } from '@angular/router';
import { TarjetaConsejoComponent } from 'src/app/components/tarjeta-consejo/tarjeta-consejo.component';
import { PanelSuperiorComponent } from 'src/app/components/panel-superior/panel-superior.component';
import { IonContent, IonList, IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-mostrar-consejo',
  templateUrl: './mostrar-consejo.page.html',
  styleUrls: ['./mostrar-consejo.page.scss'],
  standalone: true,
 imports: [ TarjetaConsejoComponent, IonContent, CommonModule, FormsModule, PanelSuperiorComponent, IonList, IonButton, IonIcon],
})
export class MostrarConsejoPage implements OnInit {

  consejo: any
  data: string[] = [];
  perfil: any = [];
  rangoEdad: string = '0-6 meses';
  mostrarPopupNativo: boolean = false;
  popupData: { titulo: string, subtitulo: string, contenido: string } = { titulo: '', subtitulo: '', contenido: '' };

  constructor(private route: ActivatedRoute, private sugerenciaservice: SugerenciasService) { }

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

    if (totalMeses <= 6) {
      return "0-6 meses";
    } else if (totalMeses <= 12) {
      return "7-12 meses";
    } else if (totalMeses <= 23) {
      return "13-23 meses";
    } else if (totalMeses <= 60) {
      return "2-5 años";
    } else if (totalMeses <= 120) {
      return "6-10 años";
    } else {
      return "Fuera de rango";
    }
  }

  cargarPerfil() {
    const data = localStorage.getItem('perfilSeleccionado');
    this.perfil = data ? JSON.parse(data) : [];
    this.rangoEdad = this.obtenerRangoEdad(this.perfil.fechaNacimiento);
  }

  ngOnInit() {

    const index = this.route.snapshot.paramMap.get('id');
    // Aquí puedes obtener el consejo usando el índice, por ejemplo desde un servicio o localStorage
    // this.consejo = ...;
    this.cargarPerfil();

    switch (index) {
      case 'alimentacion':
        this.consejo = {
          titulo: 'Consejos de alimentación',
          type: 'Consejo de alimentacion',
          color: 'alimentos', // <--- nombre corto
        };
        break;
      case 'descanso':
        this.consejo = {
          titulo: 'Consejos de sueño y descanso',
          type: 'Consejo de reposo y sueño',
          color: 'descanso',
        };
        break;
      case 'estimulación':
        this.consejo = {
          titulo: 'Consejos de estimulación del desarrollo',
          type: 'Consejos de estimulacion del desarrollo',
          color: 'estimulacion',
        };
        break;
      case 'prevencion':
        this.consejo = {
          titulo: 'Consejos de alerta y prevención de accidentes',
          type: 'Consejos de alerta y prevencion de accidentes',
          color: 'prevencion',
        };
        break;
      case 'bienestar':
        this.consejo = {
          titulo: 'Consejos de bienestar',
          type: 'Consejos de bienestar emocional',
          color: 'emocional',
        };
        break;
      case 'cuidados':
        this.consejo = {
          titulo: 'Consejos de cuidados generales',
          type: 'general',
          color: 'cuidados',
        };
        break;
      default:
        this.consejo = {
          titulo: 'Consejo no encontrado',
          contenido: '',
          type: 'desconocido',
          color: 'medium',
        };
    }

    this.sugerenciaservice.listarConsejosPorEdadYCategoria(this.rangoEdad, this.consejo.type)
    .subscribe({
      next: (respuesta) => {
        // respuesta es de tipo SugerenciaResponse
        // array de consejos
        // status (200)
        // Puedes guardar los consejos en una variable de tu componente
        this.data = respuesta.consejos;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  prepararYMostrarPopup(titulo: string, rango: string, contenido: string) {
    this.popupData = { titulo, subtitulo: rango, contenido };
    this.mostrarPopupNativo = true;
  }

  cerrarPopupNativo() {
    this.mostrarPopupNativo = false;
  }
}
