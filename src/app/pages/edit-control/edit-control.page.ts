import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CalendarioServiceService } from 'src/app/services/calendario-service.service';


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

  constructor(private router: Router,private alertCtrl: AlertController, private CalendarioServiceService:CalendarioServiceService ) {}

  //Desactivar fin de semana
  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    return utcDay !== 0 && utcDay !== 6;
  };

  form = {
    fecha: '',
    titulo: '',
    ubicacion: '',
    mensaje: '',
    recordatorio: false,
    diasAntes: null,
  };
  
  ubicaciones = ['CECOSF Juan Pablo II- Dependiente de CESFAM Rodelillo', 'Posta Laguna Verde', 'CESFAM Barón',
    'CESFAM Esperanza', 'CESFAM Cordillera', 'CESFAM Quebrada Verde', 'SAPU Quebrada Verde', 'CESFAM Marcelo Mena'
  ]; //Cambiar por localizaciones reales.
  errorFormulario: string = '';

  ngOnInit() {
    const fechaISO = localStorage.getItem('fechaSeleccionada');
    if (fechaISO) {
      this.form.fecha = fechaISO;  
    }
  }

  async guardar() {
    const { fecha, ubicacion } = this.form;
  
    if (!fecha || !ubicacion) {
      this.errorFormulario = 'Debe seleccionar una fecha y una ubicación como mínimo.';
      return;
    }
  
    if (this.form.recordatorio && (this.form.diasAntes === null || this.form.diasAntes === '')) {
      this.errorFormulario = 'Debe indicar cuántos días antes desea recibir la notificación';
      return;
    }
  
    // Asegura que la fecha esté en formato YYYY-MM-DD sin hora
    let fechaLimpia = this.form.fecha;
    if (fechaLimpia.includes('T')) {
      fechaLimpia = fechaLimpia.split('T')[0];
    }
  
    const nuevaActividad = {
      id: Date.now(),
      titulo: this.form.titulo,
      fecha: fechaLimpia,
      ubicacion: this.form.ubicacion,
      mensaje: this.form.mensaje,
      recordatorio: this.form.recordatorio,
      diasAntes: this.form.diasAntes,
      fechaISO: fechaLimpia,
    };
  
    let actividades = JSON.parse(localStorage.getItem('actividades') || '[]');
    actividades.push(nuevaActividad);
    localStorage.setItem('actividades', JSON.stringify(actividades));
  
    this.CalendarioServiceService.emitirActualizacion();
  
    this.mensajeGuardado();
    this.router.navigateByUrl('/tab/calendario', { replaceUrl: true });
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
