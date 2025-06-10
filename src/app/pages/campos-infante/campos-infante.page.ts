import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-campos-infante',
  templateUrl: './campos-infante.page.html',
  styleUrls: ['./campos-infante.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CamposInfantePage {

  constructor(private router: Router) {}

  formData = {
    nombre: '',
    fechaNacimiento: '',
    genero: ''
  };

  onCancel() {
    // Limpiar formulario o navegar hacia atrás
    console.log('Formulario cancelado');
    this.router.navigate(['/perfil']);
  }

  onSave() {
    // Simula un ID, esto puede cambiarse por un UUID o autoincremental si usas almacenamiento local
    const nuevoPerfil = {
      id: Date.now(),
      nombre: this.formData.nombre,
      fechaNacimiento: this.formData.fechaNacimiento,
      genero: this.formData.genero,
    };
  
    // Guardar en almacenamiento local
    let perfiles = JSON.parse(localStorage.getItem('perfiles') || '[]');
    perfiles.push(nuevoPerfil);
    localStorage.setItem('perfiles', JSON.stringify(perfiles));
  
    // Regresar a la página de perfiles
    this.router.navigate(['/perfil']);
  }
}
