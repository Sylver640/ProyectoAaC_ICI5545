import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule]
})
export class PerfilPage implements OnInit {
  perfiles: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarPerfiles();
  }

  ionViewWillEnter() {
    this.cargarPerfiles(); // Refrescar cuando se vuelve a la vista
  }

  cargarPerfiles() {
    const data = localStorage.getItem('perfiles');
    this.perfiles = data ? JSON.parse(data) : [];
  }

  addPerfil() {
    this.router.navigate(['/campos-infante']);
  }

  irAConfiguracion() {
    this.router.navigate(['/configuracion']);
  }

  seleccionarPerfil(perfil: any) {
    // Si hay que guardar el perfil seleccionado:
    localStorage.setItem('perfilSeleccionado', JSON.stringify(perfil));
  
    // Redirigir a la página de home
    this.router.navigate(['/tab/inicio']);
  }
}
