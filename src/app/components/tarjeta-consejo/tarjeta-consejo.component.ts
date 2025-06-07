import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tarjeta-consejo',
  templateUrl: './tarjeta-consejo.component.html',
  styleUrls: ['./tarjeta-consejo.component.scss'],
  imports: [
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle
  ],
})
export class TarjetaConsejoComponent implements OnInit {
  private _titulo = 'Título por defecto';
  private _subtitulo = 'Subtítulo por defecto';
  private _contenido = 'Contenido por defecto';
  private _imgUrl = 'https://ionicframework.com/docs/img/demos/thumbnail.svg';
  private _color = 'primary';

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

  @Input() set contenido(val: string) {
    this._contenido = val || 'Contenido por defecto';
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

  onCardClick() {
    console.log('Tarjeta clickeada:', this.titulo);
    this.router.navigate(['/tab/consejos/:id']); // <-- Navega a la página consejos
  }

  constructor(private router: Router) {
  }
  ngOnInit() {}
}
