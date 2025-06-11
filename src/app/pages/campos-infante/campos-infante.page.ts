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

  errorEdad: string = '';
  errorFormulario: string = '';


  onCancel() {
    // Limpiar formulario o navegar hacia atrás
    console.log('Formulario cancelado');
    this.router.navigate(['/perfil']);
  }

  onSave() {

    // Validar campos vacíos
    if (!this.formData.nombre || !this.formData.fechaNacimiento || !this.formData.genero) {
      this.errorFormulario = 'Todos los campos son obligatorios.';
      return;
    }

    this.errorFormulario = ''; // Limpiar error si todo está lleno

    const hoy = new Date();
    const fechaNac = new Date(this.formData.fechaNacimiento);

    const edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    const dia = hoy.getDate() - fechaNac.getDate();

    const tieneMasDe10 = edad > 10 || (edad === 10 && (mes > 0 || (mes === 0 && dia > 0)));

    if (tieneMasDe10) {
      this.errorEdad = 'La edad del infante supera los 10 años.';
      return;
    }

    this.errorEdad = '';
    

    const nuevoPerfil = {
      id: Date.now(),
      nombre: this.formData.nombre,
      fechaNacimiento: this.formData.fechaNacimiento,
      genero: this.formData.genero,
    };

    let perfiles = JSON.parse(localStorage.getItem('perfiles') || '[]');
    perfiles.push(nuevoPerfil);
    localStorage.setItem('perfiles', JSON.stringify(perfiles));

    this.router.navigate(['/perfil']);
  }
}
