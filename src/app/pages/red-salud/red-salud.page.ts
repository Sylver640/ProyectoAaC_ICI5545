import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelSuperiorComponent } from '../../components/panel-superior/panel-superior.component'
import { TarjetaCentroComponent } from 'src/app/components/tarjeta-centro/tarjeta-centro.component';
import { IonContent, IonList } from '@ionic/angular/standalone';
import { CentrosService } from 'src/app/services/centros.service';
import { Centro } from 'src/app/services/centros.service';

@Component({
  selector: 'app-red-salud',
  templateUrl: './red-salud.page.html',
  styleUrls: ['./red-salud.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonList,
    CommonModule,
    FormsModule,
    PanelSuperiorComponent,
    TarjetaCentroComponent,
  ]
})

export class RedSaludPage implements OnInit {

  centros: Centro[] = [];
  constructor(private centroService: CentrosService ) { }

  ngOnInit() {
    this.centroService.obtenerCentros().subscribe({
      next: (respuesta) => {
        this.centros = respuesta;
        console.log('Centros obtenidos:', this.centros);
      },
      error: (err) => {
        console.error('Error al obtener centros:', err);
      }
    });

  }
}
