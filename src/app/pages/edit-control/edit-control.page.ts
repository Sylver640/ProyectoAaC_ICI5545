import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-edit-control',
  templateUrl: './edit-control.page.html',
  styleUrls: ['./edit-control.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ]
})
export class EditControlPage implements OnInit {

  constructor(private router: Router,private alertCtrl: AlertController) {}

  form = {
    fecha: '',
    ubicacion: '',
    mensaje: '',
    recordatorio: false,
    diasAntes: null,
  };
  
  ubicaciones = ['Consultorio Central', 'Sucursal Norte', 'Sucursal Sur']; //Cambiar por localizaciones reales.
  errorFormulario: string = '';

  ngOnInit() {
  }

  async guardar() {
    const { fecha, ubicacion, mensaje } = this.form;
  
    if (!fecha || !ubicacion) {
      this.errorFormulario = 'Debe seleccionar una fecha y una ubicación como mínimo.';
      return;
    }
  
    if (this.form.recordatorio && (this.form.diasAntes === null || this.form.diasAntes === '')) {
      this.errorFormulario = 'Debe indicar cuántos días antes desea recibir la notificación';
      return;
    }
  
    const nuevaActividad = {
      id: Date.now(),
      fecha: this.form.fecha,
      ubicacion: this.form.ubicacion,
      mensaje: this.form.mensaje,
      recordatorio: this.form.recordatorio,
      diasAntes: this.form.diasAntes
    };
  
    let actividades = JSON.parse(localStorage.getItem('actividades') || '[]');
    actividades.push(nuevaActividad);
    localStorage.setItem('actividades', JSON.stringify(actividades));
  
    await this.mensajeGuardado(); // ✅ Mostrar mensaje al guardar correctamente
  
    this.router.navigate(['/tab/calendario']);
  }

  cancelar(){
    this.router.navigate(['/tab/calendario']);
  }

  async mensajeGuardado() {
    const alert = await this.alertCtrl.create({
      header: 'Actividad guardada',
      message: `Tu actividad ha sido guardada!`,
      buttons: [
        {
          text: 'Ok',
        }
      ]
    });
  
    await alert.present();
  }

}
