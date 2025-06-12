import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

// Definir una interfaz para las actividades
interface Actividad {
  id: number;
  fecha: string;
  fechaISO?: string;
  ubicacion: string;
  mensaje: string;
  recordatorio: boolean;
  diasAntes: number | null;
}

@Component({
  selector: 'app-edit-actividad',
  templateUrl: './edit-actividad.page.html',
  styleUrls: ['./edit-actividad.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ]
})
export class EditActividadPage implements OnInit {

  // Inicializamos actividadId como null o 0, ya que será asignado más tarde
  actividadId: number | null = null;

  // Formulario de la actividad a editar
  form: Actividad = {
    id: 0, // Temporalmente asignado como 0
    fecha: '',
    ubicacion: '',
    mensaje: '',
    recordatorio: false,
    diasAntes: null,
  };

  // Lista de ubicaciones (puedes modificar esto según sea necesario)
  ubicaciones = ['Consultorio Central', 'Sucursal Norte', 'Sucursal Sur'];

  errorFormulario: string = '';

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private activatedRoute: ActivatedRoute // Para obtener el parámetro de la ruta
  ) {}

  ngOnInit() {
    // Obtener el ID de la actividad desde la ruta
    this.actividadId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    // Si no se encuentra el id, redirigimos
    if (this.actividadId === null || isNaN(this.actividadId)) {
      this.router.navigate(['/tab/calendario']);
      return;
    }

    // Cargar la actividad a editar desde el localStorage
    this.cargarActividad();
  }

  cargarActividad() {
    // Obtener las actividades del localStorage
    let actividades: Actividad[] = JSON.parse(localStorage.getItem('actividades') || '[]');

    // Buscar la actividad con el ID correspondiente
    const actividad = actividades.find(act => act.id === this.actividadId);

    if (actividad) {
      // Llenar el formulario con los datos de la actividad
      this.form = { ...actividad };
    } else {
      // Si no se encuentra la actividad, redirigir o mostrar error
      this.router.navigate(['/tab/calendario']);
    }
  }

  async guardar() {
    const { fecha, ubicacion, mensaje } = this.form;

    // Validación de campos
    if (!fecha || !ubicacion) {
      this.errorFormulario = 'Debe seleccionar una fecha y una ubicación como mínimo.';
      return;
    }

    if (this.form.recordatorio && (this.form.diasAntes === null || this.form.diasAntes <= 0)) {
      this.errorFormulario = 'Debe indicar cuántos días antes desea recibir la notificación';
      return;
    }

    // Obtener las actividades del localStorage
    let actividades: Actividad[] = JSON.parse(localStorage.getItem('actividades') || '[]');

    // Buscar la actividad a editar usando el id
    const index = actividades.findIndex(act => act.id === this.actividadId);

    if (index !== -1) {
      // Actualizar la actividad con los nuevos datos
      actividades[index] = {
        id: this.actividadId!,
        fecha: this.form.fecha,
        fechaISO: this.form.fecha.split('T')[0], // <- aquí extraemos YYYY-MM-DD
        ubicacion: this.form.ubicacion,
        mensaje: this.form.mensaje,
        recordatorio: this.form.recordatorio,
        diasAntes: this.form.diasAntes
      };

      // Guardar las actividades actualizadas en localStorage
      localStorage.setItem('actividades', JSON.stringify(actividades));

      // Mostrar mensaje de éxito
      await this.mensajeGuardado();

      // Redirigir al calendario
      this.router.navigate(['/tab/calendario']);
    } else {
      this.errorFormulario = 'Actividad no encontrada.';
    }
  }

  cancelar() {
    // Redirigir al calendario sin guardar cambios
    this.router.navigate(['/tab/calendario']);
  }

  async mensajeGuardado() {
    // Crear y mostrar el mensaje de actividad guardada
    const alert = await this.alertCtrl.create({
      header: 'Actividad actualizada',
      message: `Tu actividad ha sido actualizada con éxito!`,
      buttons: [
        {
          text: 'Ok',
        }
      ]
    });

    await alert.present();
  }

}