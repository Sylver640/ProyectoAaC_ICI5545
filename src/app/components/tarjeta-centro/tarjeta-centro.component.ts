import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonCard } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tarjeta-centro',
  templateUrl: './tarjeta-centro.component.html',
  styleUrls: ['./tarjeta-centro.component.scss'],
   imports: [
    IonCard,
    CommonModule,
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
  telefonosList: string[] = [];

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
    // Procesar el string de teléfono aquí
    if (this._telefono) {
      this.telefonosList = this._telefono.split(';');
      // Opcional: limpiar espacios en blanco alrededor de cada número
      this.telefonosList = this.telefonosList.map(tel => tel.trim());
    } else {
      this.telefonosList = []; // Si el teléfono es nulo o vacío, la lista también lo es
    }
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
