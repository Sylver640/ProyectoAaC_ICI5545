import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'], // Tus estilos irán aquí
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ConfiguracionPage implements OnInit {

  perfiles: any[] = [];
  isHtmlPopupOpen = false; // Nuevo estado para el pop-up HTML
  perfilSeleccionado: any | null = null; // Para guardar el perfil que se va a eliminar

  constructor(private router: Router, private alertCtrl: AlertController) {}

  ngOnInit() {
    this.cargarPerfiles();
  }

  ionViewWillEnter() {
    this.cargarPerfiles();
  }

  cargarPerfiles() {
    const datos = localStorage.getItem('perfiles');
    this.perfiles = datos ? JSON.parse(datos) : [];
  }

  editarPerfil(perfil: any) {
    this.router.navigate(['/editar-perfil'], { state: { perfil } });
  }

  volver() {
    this.router.navigate(['/perfil']);
  }

  presentarHtmlConfirmacion(perfil: any) {
    console.log('Abriendo pop-up HTML de confirmación para perfil:', perfil);
    this.perfilSeleccionado = perfil;
    this.isHtmlPopupOpen = true; // Abre el pop-up
  }

  cancelarHtmlEliminacion() {
    console.log('Eliminación cancelada desde pop-up HTML.');
    this.isHtmlPopupOpen = false; // Cierra el pop-up
  }

  confirmarHtmlEliminacion() {
    if (this.perfilSeleccionado) {
      console.log('Confirmando eliminación de perfil desde pop-up HTML:', this.perfilSeleccionado);
      this.eliminarPerfil(this.perfilSeleccionado);
      this.isHtmlPopupOpen = false;
      this.perfilSeleccionado = null;
    }
  }

  // **** TU FUNCIÓN ORIGINAL DE ELIMINAR PERFIL ****
  eliminarPerfil(perfil: any) {
    this.perfiles = this.perfiles.filter(p => p.id !== perfil.id);
    localStorage.setItem('perfiles', JSON.stringify(this.perfiles));
    console.log('Perfil eliminado:', perfil);
  }
}