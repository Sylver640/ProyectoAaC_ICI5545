import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarjetaConsejoComponent } from '../../components/tarjeta-consejo/tarjeta-consejo.component';
import { PanelSuperiorComponent } from '../../components/panel-superior/panel-superior.component'
import { IonContent, IonList } from '@ionic/angular/standalone';
import { Router } from '@angular/router';


@Component({
  selector: 'app-consejos',
  templateUrl: './consejos.page.html',
  styleUrls: ['./consejos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonList,
    PanelSuperiorComponent,
    TarjetaConsejoComponent,
    CommonModule,
    FormsModule
  ]
})

export class ConsejosPage implements OnInit {

  perfil: any = [];
  edad = 0;
  consejos = [
    {
      class: 'consejo-alimentacion',
      titulo: 'Consejos de alimentación',
      imgUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      color: 'alimentos',
      type: 'alimentacion'
    },
    {
      class: 'consejo-reposo',
      titulo: 'Consejos de reposo y sueño',
      imgUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      color: 'descanso',
      type: 'descanso'
    },
    {
      class: 'consejo-estimulacion',
      titulo: 'Consejos de estimulación del desarrollo',
      imgUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      color: 'estimulacion',
      type: 'estimulación'
    },
    {
      class: 'consejo-prevencion',
      titulo: 'Consejos de alerta y prevención de accidentes',
      imgUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      color: 'prevencion',
      type: 'prevencion'
    },
    {
      class: 'consejo-bienestar',
      titulo: 'Consejos de bienestar',
      imgUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      color: 'emocional',
      type: 'bienestar'
    },
    {
      class: 'consejo-cuidados',
      titulo: 'Consejos de Cuidados generales',
      imgUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      color: 'cuidados',
      type: 'cuidados'
    }
  ];

 constructor(private router: Router) {}

  calcularEdad(fechaNacimiento: string): string {
    if (!fechaNacimiento) return '';
    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();

    let años = hoy.getFullYear() - nacimiento.getFullYear();
    let meses = hoy.getMonth() - nacimiento.getMonth();

    if (meses < 0) {
      años--;
      meses += 12;
    }

    // Opcional: Si quieres mostrar solo meses si es menor a 1 año
    if (años === 0) return `${meses} mes${meses === 1 ? '' : 'es'}`;
    if (meses === 0) return `${años} año${años === 1 ? '' : 's'}`;
    return `${años} año${años === 1 ? '' : 's'} y ${meses} mes${meses === 1 ? '' : 'es'}`;
  }

  verConsejo(index: string) {
    this.router.navigate(['tab/consejos', index]);
  }

  cargarPerfil() {
    const data = localStorage.getItem('perfilSeleccionado');
    this.perfil = data ? JSON.parse(data) : [];
  }

  ngOnInit() {
    this.cargarPerfil();
    console.log('Perfil cargado:', this.perfil);
  }

}
