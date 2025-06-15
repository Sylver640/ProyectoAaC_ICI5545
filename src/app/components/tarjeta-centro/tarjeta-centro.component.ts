import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tarjeta-centro',
  templateUrl: './tarjeta-centro.component.html',
  styleUrls: ['./tarjeta-centro.component.scss'],
   imports: [
    IonCard,
    IonCardSubtitle,
    IonCardTitle,
    CommonModule
  ],
})

export class TarjetaCentroComponent  implements OnInit {

  private _titulo = 'Título por defecto';
  private _subtitulo = '';
  private _contenido = '';
  private _imgUrl = 'https://ionicframework.com/docs/img/demos/thumbnail.svg';
  private _color = 'primary';
  private _dynamicSize = false;

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

  @Input() set contenido(val: string) {
    this._contenido = val || '';
  }
  get contenido() {
    return this._contenido;
  }

  @Input() set imgUrl(val: string) {
    this._imgUrl = val || 'https://ionicframework.com/docs/img/demos/thumbnail.svg';
  }
  get imgUrl() {
    return this._imgUrl;
  }

  @Input() set color(val: string) {
    this._color = val || 'primary';
  }
  get color() {
    return this._color;
  }

  @Input () set dynamicSize(val: boolean) {
    this._dynamicSize = val || false;
  }
  get dynamicSize() {
    return this._dynamicSize;
  }

  constructor(private router: Router) {
  }
  ngOnInit() {}

}
