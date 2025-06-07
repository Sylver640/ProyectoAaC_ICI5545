import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PanelSuperiorComponent } from 'src/app/components/panel-superior/panel-superior.component';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-mostrar-consejo',
  templateUrl: './mostrar-consejo.page.html',
  styleUrls: ['./mostrar-consejo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, PanelSuperiorComponent]
})
export class MostrarConsejoPage implements OnInit {

  consejo: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const index = this.route.snapshot.paramMap.get('id');
    // Aquí puedes obtener el consejo usando el índice, por ejemplo desde un servicio o localStorage
    // this.consejo = ...;
    switch (index) {
      case '0':
        this.consejo = {
          titulo: 'Consejo de alimentación',
          contenido: 'Contenido del consejo 1',
          type: 'alimentacion',
        };
        break;
      case '1':
        this.consejo = {
          titulo: 'Consejo de sueño y descanso',
          contenido: 'Contenido del consejo 2',
          type: 'descanso',
        };
        break;
      case '2':
        this.consejo = {
          titulo: 'Consejos de estimulación del desarrollo',
          contenido: 'Contenido del consejo 3',
          type: 'estimulación',
        };
        break;
      case '3':
        this.consejo = {
          titulo: 'Consejos de alerta y prevención de accidentes',
          contenido: 'Contenido del consejo 4',
          type: 'prevencion',
        };
        break;
      case '4':
        this.consejo = {
          titulo: 'Consejo de bienestar',
          contenido: 'Contenido del consejo 5',
          type: 'bienestar',
        };
        break;
      case '5':
        this.consejo = {
          titulo: 'Consejo de cuidados generales',
          contenido: 'Contenido del consejo 6',
          type: 'cuidados',
        };
        break;
      default:
        this.consejo = {
          titulo: 'Consejo no encontrado',
          contenido: '',
          type: 'desconocido',
        };
    }
  }

}
