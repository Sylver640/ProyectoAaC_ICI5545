import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
  standalone: true,
  imports: [IonIcon,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
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
