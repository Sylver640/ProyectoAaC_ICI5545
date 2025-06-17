import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonCard, IonIcon, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tarjeta-centro',
  templateUrl: './tarjeta-centro.component.html',
  styleUrls: ['./tarjeta-centro.component.scss'],
   imports: [
    IonCard,
    IonCardSubtitle,
    IonCardTitle,
    CommonModule,
    IonIcon
  ],
})

export class TarjetaCentroComponent  implements OnInit {

  private _titulo = 'Título por defecto';
  private _imgUrl = 'https://ionicframework.com/docs/img/demos/thumbnail.svg';
  private _color = 'primary';
  private _dynamicSize = false;

  private _direccion = '';
  private _horario = '';
  private _telefono = '';

  @Input() set titulo(val: string) {
    this._titulo = val || 'Título por defecto';
  }
  get titulo() {
    return this._titulo;
  }

  @Input() set direccion(val: string) {
    this._direccion = val || '';
  }
  get direccion() {
    return this._direccion;
  }
  @Input() set horario(val: string) {
    this._horario = val || '';
  }
  get horario() {
    return this._horario;
  }
  @Input() set telefono(val: string) {
    this._telefono = val || '';
  }
  get telefono() {
    return this._telefono;
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
