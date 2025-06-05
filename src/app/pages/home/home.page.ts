import { Component } from '@angular/core';
import { Router } from '@angular/router'; // <-- Agrega esto
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage {
  constructor(private router: Router) {} // <-- Inyecta el router

  consejos() {
    this.router.navigate(['/consejos']); // <-- Navega a la página consejos
  }
}
