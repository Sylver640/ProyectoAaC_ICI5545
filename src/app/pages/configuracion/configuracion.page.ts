import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  imports: [IonicModule,CommonModule,FormsModule]
})
export class ConfiguracionPage implements OnInit {

  perfiles: any[] = [];

  constructor(private router: Router, private alertCtrl: AlertController) {}

  ngOnInit() {
    this.cargarPerfiles();
  }

  ionViewWillEnter() {
    this.cargarPerfiles(); // Se ejecuta cada vez que se entra a la vista
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

  eliminarPerfil(perfil: any) {
    this.perfiles = this.perfiles.filter(p => p.id !== perfil.id);
    localStorage.setItem('perfiles', JSON.stringify(this.perfiles));
  }

  async confirmarEliminacion(perfil: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar el perfil de ${perfil.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sí, eliminar',
          handler: () => this.eliminarPerfil(perfil)
        }
      ]
    });
  
    await alert.present();
  }
}