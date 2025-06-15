import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ConsejosService } from 'src/app/services/consejos.service';
import { SugerenciasService } from 'src/app/services/sugerencias.service';
import { ActivatedRoute } from '@angular/router';
import { TestModalComponent } from 'src/app/components/test-modal/test-modal.component';
import { TarjetaConsejoComponent } from 'src/app/components/tarjeta-consejo/tarjeta-consejo.component';
import { PanelSuperiorComponent } from 'src/app/components/panel-superior/panel-superior.component';
import { IonContent, IonList, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-mostrar-consejo',
  templateUrl: './mostrar-consejo.page.html',
  styleUrls: ['./mostrar-consejo.page.scss'],
  standalone: true,
  imports: [ TestModalComponent,TarjetaConsejoComponent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, PanelSuperiorComponent, IonList],
  providers: [ModalController],
})
export class MostrarConsejoPage implements OnInit {

  consejo: any
  data: string[] = [];
  perfil: any = [];
  rangoEdad: string = '0-6 meses';
  private currentModal: HTMLIonModalElement | null = null;

  constructor(private route: ActivatedRoute, private sugerenciaservice: SugerenciasService, private modalCtrl: ModalController) { }

  async openModal(titulo: string, rango: string, contenido: string) {
    if (this.currentModal) {
      await this.currentModal.dismiss();
      this.currentModal = null;
      return this.currentModal;
    }
    this.currentModal = await this.modalCtrl.create({
      component: TestModalComponent,
      componentProps: {
        titulo: titulo,
        subtitulo: rango,
        contenido: contenido,
      },
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 0.5,
    });

    this.currentModal.onDidDismiss().then(() => {
      this.currentModal = null;
    });

    await this.currentModal.present();
    return this.currentModal;
  }

  async closeModal() {
    if (this.currentModal) {
      await this.currentModal.dismiss();
      this.currentModal = null;
      return;
    }
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
        this.data = respuesta.consejos as string[];
        console.log(typeof (respuesta.consejos as string[]));
        console.log(this.data)
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });

  }
}
