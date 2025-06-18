import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent} from '@ionic/angular/standalone';
import { ContactosService } from 'src/app/services/contactos.service';
import { PanelSuperiorComponent } from 'src/app/components/panel-superior/panel-superior.component';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, PanelSuperiorComponent]
})

export class ContactosPage implements OnInit {
  contactos: { nombre: string; numero: string; descripcion: string }[] = [];

  constructor(private router: Router, private contactoService: ContactosService){}

  ngOnInit() {
    this.contactoService.obtenerContactos().subscribe({
        next: (data) => {

          this.contactos = data.map(contacto => ({
            nombre: contacto.nombre,
            numero: contacto.telefono,
            descripcion: contacto.descripcion
          }));

          console.log('Contactos obtenidos:', this.contactos);

        },
        error: (err) => {
          console.error('Error al obtener los contactos:', err);
        }
      }
    );
  }

  goBack() {
    this.router.navigate(['/tab/inicio']);
  }

}
