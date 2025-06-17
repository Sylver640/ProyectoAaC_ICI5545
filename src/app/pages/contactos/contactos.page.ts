import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent} from '@ionic/angular/standalone';
import { PanelSuperiorComponent } from 'src/app/components/panel-superior/panel-superior.component';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, PanelSuperiorComponent]
})

export class ContactosPage implements OnInit {
  contactos = [
    { nombre: 'Fono infancia', numero: '800 200 818' },
    { nombre: 'Salud responde', numero: '600 360 7777' },
    { nombre: 'Fono mujer y maternidad', numero: '800 520 100' },
    { nombre: 'Fono niños', numero: '147' },
    { nombre: 'Fono familia', numero: '149' },
    { nombre: 'Ambulancia', numero: '131' },
  ];

  constructor(private router: Router){}

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/tab/inicio']);
  }

}
