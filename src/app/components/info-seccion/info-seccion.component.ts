import { Component, Input, OnInit } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-info-seccion',
  templateUrl: './info-seccion.component.html',
  styleUrls: ['./info-seccion.component.scss'],
  imports: [IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonTitle],
})
export class InfoSeccionComponent  implements OnInit {
  private _titulo = 'Título por defecto';
  private _subtitulo = 'Subtítulo por defecto';

  @Input() set titulo(val: string) {
    this._titulo = val || 'Título por defecto';
  }
  get titulo() {
    return this._titulo;
  }
  @Input() set subtitulo(val: string) {
    this._subtitulo = val || 'Subtítulo por defecto';
  }
  get subtitulo() {
    return this._subtitulo;
  }

  constructor() { }

  ngOnInit() {}

}
