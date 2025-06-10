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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.perfilId = Number(this.route.snapshot.paramMap.get('id'));
    const perfiles = JSON.parse(localStorage.getItem('perfiles') || '[]');
    const perfil = perfiles.find((p: any) => p.id === this.perfilId);

    if (perfil) {
      this.formData = { ...perfil };
    }
  }

  onCancel() {
    this.router.navigate(['/configuracion']);
  }

  onUpdate() {
    let perfiles = JSON.parse(localStorage.getItem('perfiles') || '[]');
    const index = perfiles.findIndex((p: any) => p.id === this.perfilId);

    if (index !== -1) {
      perfiles[index] = { id: this.perfilId, ...this.formData };
      localStorage.setItem('perfiles', JSON.stringify(perfiles));
    }

    this.router.navigate(['/configuracion']);
  }
}