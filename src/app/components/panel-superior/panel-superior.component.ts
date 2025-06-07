import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoSeccionComponent } from '../info-seccion/info-seccion.component';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-panel-superior',
  templateUrl: './panel-superior.component.html',
  styleUrls: ['./panel-superior.component.scss'],
  imports: [
    InfoSeccionComponent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonBackButton,
    CommonModule
  ]
})
export class PanelSuperiorComponent  implements OnInit {

  private _titulo: string = 'Panel Superior';
  private _subtitulo: string = 'Subtítulo del Panel Superior';
  private _button: boolean = true;

  @Input() set titulo(value: string) {
    this._titulo = value;
  }
  get titulo(): string {
    return this._titulo;
  }
  @Input() set subtitulo(value: string) {
    this._subtitulo = value;
  }
  get subtitulo(): string {
    return this._subtitulo;
  }

  @Input() set button(value: boolean) {
    this._button = value;
  }
  get button(): boolean {
    return this._button;
  }

  constructor() { }

  logout() {
    console.log('Logout clicked');
  }

  ngOnInit() {}

}
