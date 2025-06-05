import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarjetaConsejoComponent } from '../components/tarjeta-consejo/tarjeta-consejo.component';
import { InfoSeccionComponent } from '../components/info-seccion/info-seccion.component';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonButtons, IonButton, IonBackButton } from '@ionic/angular/standalone';


@Component({
  selector: 'app-consejos',
  templateUrl: './consejos.page.html',
  styleUrls: ['./consejos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonButtons,
    IonButton,
    IonBackButton,
    TarjetaConsejoComponent,
    InfoSeccionComponent,
    CommonModule,
    FormsModule
  ]
})
export class ConsejosPage implements OnInit {

  nombre = 'Vicente Mercado';
  edad = '2 años y 3 meses';

consejos = [
  {
    titulo: 'Consejos de alimentación',
    subtitulo: 'Importante',
    contenido: 'Recuerda lavar las manos antes de cada comida.',
    imgUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    color: 'alimentos'
  },
  {
    titulo: 'Consejos de reposo y sueño',
    subtitulo: 'Recomendado',
    contenido: 'Asegúrate de que duerma al menos 10 horas cada noche.',
    imgUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    color: 'descanzo'
  },
  {
    titulo: 'Consejos de estimulación del desarrollo',
    subtitulo: 'Salud',
    contenido: 'Incluye frutas y verduras en su dieta diaria.',
    imgUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    color: 'estimulacion'
  },
  {
    titulo: 'Consejos de alerta y prevención de accidentes',
    subtitulo: 'Seguridad',
    contenido: 'Mantén los objetos pequeños fuera de su alcance.',
    imgUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    color: 'prevencion'
  },
  {
    titulo: 'Consejos de bienestar',
    subtitulo: 'Desarrollo',
    contenido: 'Lee cuentos juntos todos los días.',
    imgUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    color: 'emocional'
  },
  {
    titulo: 'Consejos de Cuidados generales',
    subtitulo: 'Actividad',
    contenido: 'Fomenta el juego al aire libre siempre que sea posible.',
    imgUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    color: 'cuidados'
  }];

  constructor() { }

  logout() {
    console.log('Logout clicked');
  }

  ngOnInit() {
  }

}
