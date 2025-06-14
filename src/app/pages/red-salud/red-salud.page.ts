import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarjetaConsejoComponent } from '../../components/tarjeta-consejo/tarjeta-consejo.component';
import { PanelSuperiorComponent } from '../../components/panel-superior/panel-superior.component'
import { IonContent, IonList } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { CentrosService } from 'src/app/services/centros.service';

@Component({
  selector: 'app-red-salud',
  templateUrl: './red-salud.page.html',
  styleUrls: ['./red-salud.page.scss'],
  standalone: true,
  imports: [IonContent, IonList, CommonModule, FormsModule, PanelSuperiorComponent, TarjetaConsejoComponent]
})
export class RedSaludPage implements OnInit {

  centros: any[] = [];
  constructor(private centroService: CentrosService ) { }

  ngOnInit() {
    this.centroService.obtenerCentros().subscribe({
      next: (respuesta) => {
        this.centros = respuesta;
        console.log('Centros:', this.centros);
      },
      error: (err) => {
        console.error('Error al obtener centros:', err);
      }
    });
  }

}
