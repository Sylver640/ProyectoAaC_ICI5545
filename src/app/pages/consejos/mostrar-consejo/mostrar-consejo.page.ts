import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  constructor() { }

  ngOnInit() {
  }

}
