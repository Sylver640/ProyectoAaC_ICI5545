import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarjetaConsejoComponent } from '../../components/tarjeta-consejo/tarjeta-consejo.component';
import { PanelSuperiorComponent } from '../../components/panel-superior/panel-superior.component';
import { PanelInferiorComponent } from '../../components/panel-inferior/panel-inferior.component';
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
    PanelInferiorComponent,
    TarjetaConsejoComponent,
    CommonModule,
    FormsModule
  ]
})

export class ConsejosPage implements OnInit {

  nombre = 'Rodrigo';
  titulo = 'Consejos para ' + this.nombre;
  edad = '2 años y 3 meses';

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
      color: 'descanzo',
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

  verConsejo(index: string) {
    this.router.navigate(['tab/consejos', index]);
  }
  ngOnInit() {
  }

}
