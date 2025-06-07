import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsejosService } from 'src/app/services/consejos.service';
import { ActivatedRoute } from '@angular/router';
import { TarjetaConsejoComponent } from 'src/app/components/tarjeta-consejo/tarjeta-consejo.component';
import { PanelSuperiorComponent } from 'src/app/components/panel-superior/panel-superior.component';
import { IonContent, IonList, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-mostrar-consejo',
  templateUrl: './mostrar-consejo.page.html',
  styleUrls: ['./mostrar-consejo.page.scss'],
  standalone: true,
  imports: [ TarjetaConsejoComponent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, PanelSuperiorComponent, IonList]
})
export class MostrarConsejoPage implements OnInit {

  consejo: any
  data: any;

  constructor(private route: ActivatedRoute, private consejoservice: ConsejosService) { }

  ngOnInit() {
    const index = this.route.snapshot.paramMap.get('id');
    // Aquí puedes obtener el consejo usando el índice, por ejemplo desde un servicio o localStorage
    // this.consejo = ...;
    this.data = this.consejoservice.getConsejos(index);
    switch (index) {
      case 'alimentacion':
        this.consejo = {
          titulo: 'Consejo de alimentación',
          contenido: 'Contenido del consejo 1',
          type: 'alimentacion',
        };
        break;
      case 'descanso':
        this.consejo = {
          titulo: 'Consejo de sueño y descanso',
          contenido: 'Contenido del consejo 2',
          type: 'descanso',
        };
        break;
      case 'estimulación':
        this.consejo = {
          titulo: 'Consejos de estimulación del desarrollo',
          contenido: 'Contenido del consejo 3',
          type: 'estimulación',
        };
        break;
      case 'prevencion':
        this.consejo = {
          titulo: 'Consejos de alerta y prevención de accidentes',
          contenido: 'Contenido del consejo 4',
          type: 'prevencion',
        };
        break;
      case 'bienestar':
        this.consejo = {
          titulo: 'Consejo de bienestar',
          contenido: 'Contenido del consejo 5',
          type: 'bienestar',
        };
        break;
      case 'cuidados':
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
