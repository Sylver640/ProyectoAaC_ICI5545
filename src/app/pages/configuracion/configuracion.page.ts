import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  imports: [IonicModule,CommonModule,FormsModule]
})
export class ConfiguracionPage implements OnInit {

  perfiles: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarPerfiles();
  }

  cargarPerfiles() {
    const datos = localStorage.getItem('perfiles');
    this.perfiles = datos ? JSON.parse(datos) : [];
  }

  editarPerfil(perfil: any) {
    this.router.navigate(['/editar-perfil'], { state: { perfil } });
  }
}