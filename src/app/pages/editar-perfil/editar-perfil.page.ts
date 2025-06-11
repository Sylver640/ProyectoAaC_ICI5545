import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditarPerfilPage implements OnInit {

  formData = {
    nombre: '',
    fechaNacimiento: '',
    genero: ''
  };

  perfilId: number = 0;
  errorEdad: string = '';
  errorFormulario: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { perfil: any };
  
    if (state?.perfil) {
      this.perfilId = state.perfil.id;
      this.formData = { ...state.perfil };
    } else {
      // Fallback: redirigir si no hay datos
      this.router.navigate(['/configuracion']);
    }
  }

  onCancel() {
    this.router.navigate(['/configuracion']);
  }

  onUpdate() {
    // Validar campos vacíos
    if (!this.formData.nombre || !this.formData.fechaNacimiento || !this.formData.genero) {
      this.errorFormulario = 'Todos los campos son obligatorios.';
      return;
    }
  
    this.errorFormulario = ''; // Limpiar si todo está bien
  
    // Validar edad
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
  
    this.errorEdad = ''; // Limpiar error si todo está correcto
  
    // Guardar cambios
    let perfiles = JSON.parse(localStorage.getItem('perfiles') || '[]');
    const index = perfiles.findIndex((p: any) => p.id === this.perfilId);
  
    if (index !== -1) {
      perfiles[index] = { id: this.perfilId, ...this.formData };
      localStorage.setItem('perfiles', JSON.stringify(perfiles));
    }
  
    this.router.navigate(['/configuracion']);
  }

}