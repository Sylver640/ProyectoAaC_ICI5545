import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-seccion',
  templateUrl: './info-seccion.component.html',
  styleUrls: ['./info-seccion.component.scss'],
  imports: [CommonModule],
})
export class InfoSeccionComponent  implements OnInit {
  private _titulo = 'Título por defecto';
  private _subtitulo = '';
  private _padding = '0px';

  @Input() set titulo(val: string) {
    this._titulo = val || 'Título por defecto';
  }
  get titulo() {
    return this._titulo;
  }
  @Input() set subtitulo(val: string) {
    this._subtitulo = val || '';
  }
  get subtitulo() {
    return this._subtitulo;
  }

  @Input() set padding(val: string) {
    this._padding = val || '0px';
  }
  get padding() {
    return this._padding;
  }

  constructor() { }

  ngOnInit() {}

}
