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

  nombre = 'rodrigo';
  titulo = 'Consejos para ' + this.nombre;
  edad = '2 años y 3 meses';

  consejos = [
    {
      class: 'consejo-alimentacion',
      titulo: 'Consejos de alimentación',
      subtitulo: 'Importante',
      contenido: 'Recuerda lavar las manos antes de cada comida.',
      imgUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      color: 'alimentos'
    },
    {
      class: 'consejo-reposo',
      titulo: 'Consejos de reposo y sueño',
      subtitulo: 'Recomendado',
      contenido: 'Asegúrate de que duerma al menos 10 horas cada noche.',
      imgUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      color: 'descanzo'
    },
    {
      class: 'consejo-estimulacion',
      titulo: 'Consejos de estimulación del desarrollo',
      subtitulo: 'Salud',
      contenido: 'Incluye frutas y verduras en su dieta diaria.',
      imgUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      color: 'estimulacion'
    },
    {
      class: 'consejo-prevencion',
      titulo: 'Consejos de alerta y prevención de accidentes',
      subtitulo: 'Seguridad',
      contenido: 'Mantén los objetos pequeños fuera de su alcance.',
      imgUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      color: 'prevencion'
    },
    {
      class: 'consejo-bienestar',
      titulo: 'Consejos de bienestar',
      subtitulo: 'Desarrollo',
      contenido: 'Lee cuentos juntos todos los días.',
      imgUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      color: 'emocional'
    },
    {
      class: 'consejo-cuidados',
      titulo: 'Consejos de Cuidados generales',
      subtitulo: 'Actividad',
      contenido: 'Fomenta el juego al aire libre siempre que sea posible.',
      imgUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      color: 'cuidados'
    }
  ];

 constructor(private router: Router) {}

  verConsejo(index: number) {
    this.router.navigate(['tab/consejos', index]);
  }
  ngOnInit() {
  }

}
