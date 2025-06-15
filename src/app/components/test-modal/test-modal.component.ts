import { Component, Input, OnInit } from '@angular/core';
import { PanelSuperiorComponent } from '../panel-superior/panel-superior.component';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { IonButtons, IonButton, IonContent} from '@ionic/angular/standalone';


@Component({
  standalone: true,
  selector: 'app-test-modal',
  templateUrl: './test-modal.component.html',
  imports: [PanelSuperiorComponent, CommonModule, IonButtons, IonButton, IonContent],
  providers: [ModalController],
  styleUrls: ['./test-modal.component.scss'],
})
export class TestModalComponent  implements OnInit {

   constructor(private modalCtrl: ModalController) { }
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Input() contenido: string = '';

  ngOnInit() {}

  closeModal() {
    // Aquí puedes implementar la lógica para cerrar el modal
    this.modalCtrl.dismiss()
  }

}
