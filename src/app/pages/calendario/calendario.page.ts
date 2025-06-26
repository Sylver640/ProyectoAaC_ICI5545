import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PanelSuperiorComponent } from 'src/app/components/panel-superior/panel-superior.component';
import { CalendarioServiceService } from 'src/app/services/calendario-service.service';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonDatetime,
  IonRow,
  IonCol,
  IonGrid
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonDatetime,
    IonRow,
    IonCol,
    IonGrid,
    PanelSuperiorComponent
  ]
})
export class CalendarioPage {

  //Desactivar fin de semana
  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    return utcDay !== 0 && utcDay !== 6;
  };

  actividad: any = null;
  actividades: any[] = [];
  actividadesDelDia: any[] = [];
  actividadActual: number = 0;
  fechaSeleccionada: string = ''; // formato ISO
  mostrarConfirmacion: boolean = false;
  mostrarEleminacion: boolean = false;
  fechaNacimiento: string = '';

  constructor (private router: Router,private cdr: ChangeDetectorRef, private CalendarioServiceService: CalendarioServiceService){}

  ngOnInit() {
    this.cargarActividades();

    this.CalendarioServiceService.actualizarCalendario$.subscribe(() => {
      this.actualizarCalendario();
    });
  }

  ionViewWillEnter() {
    const datosLocales = localStorage.getItem('actividades');
    const actividadesLocales = datosLocales ? JSON.parse(datosLocales) : [];

    const fechaGuardada = localStorage.getItem('fechaSeleccionada');
    if (fechaGuardada) {
      this.fechaSeleccionada = fechaGuardada;
      this.onDateChange({ detail: { value: fechaGuardada } });
    }

    const fechaNacimientoGuardada = localStorage.getItem('fechaNacimiento');
    if (fechaNacimientoGuardada) {
      this.fechaNacimiento = fechaNacimientoGuardada;

      const nacimiento = new Date(this.fechaNacimiento);
      const hoy = new Date();
      const edadMeses = (hoy.getFullYear() - nacimiento.getFullYear()) * 12 + (hoy.getMonth() - nacimiento.getMonth());

      this.CalendarioServiceService.listarConsejos(this.fechaNacimiento).subscribe(
        (res) => {
          const actividadesSeremi = res.filter(act => {
            if (!act.fechaTentativa) return false;

            const [anioTentativo, mesTentativo] = act.fechaTentativa.split('-').map(Number);
            const fechaTentativa = new Date(anioTentativo, mesTentativo - 1);
            const mesesDesdeNacimiento = (fechaTentativa.getFullYear() - nacimiento.getFullYear()) * 12 + (fechaTentativa.getMonth() - nacimiento.getMonth());

            return mesesDesdeNacimiento === edadMeses;
          });

          // ✅ Combinar actividades locales + seremi
          this.actividades = [...actividadesLocales, ...actividadesSeremi];
          console.log('Actividades locales + SEREMI:', this.actividades);
        },
        (error) => {
          console.error('Error al obtener actividades del SEREMI:', error);
          this.actividades = [...actividadesLocales]; // Fallback solo con locales
        }
      );
    } else {
      // Si no hay fecha de nacimiento, solo usar locales
      this.actividades = [...actividadesLocales];
    }
  }
  
  cargarActividades() {
    const datos = localStorage.getItem('actividades');
    this.actividades = datos ? JSON.parse(datos) : [];
    console.log('Actividades cargadas:', this.actividades);
  }

  formatFecha(fechaISO: string): string {
    const [año, mes, dia] = fechaISO.split('-').map(Number);
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                   'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return `${dia} de ${meses[mes - 1]} de ${año}`;
  }

  onDateChange(event: any) {
    const fechaISO: string = event.detail.value?.split('T')[0];

    this.fechaSeleccionada = fechaISO;

    const [anioSeleccionado, mesSeleccionado] = this.fechaSeleccionada.split('-');

    this.actividadesDelDia = this.actividades.filter(act => {
      if (act.tipo === 'Vacuna' || act.tipo === 'Control de salud') {
        const [anioTentativo, mesTentativo] = (act.fechaTentativa || '').split('-');
        return anioTentativo === anioSeleccionado && mesTentativo === mesSeleccionado;
      } else {
        return act.fechaISO === this.fechaSeleccionada;
      }
    });

    if (this.actividadesDelDia.length > 0) {
      this.actividadActual = 0;
      this.actividad = { ...this.actividadesDelDia[0] };
    } else {
      this.actividadActual = -1;
      this.actividad = null;
    }

    console.log('Fecha seleccionada:', this.fechaSeleccionada);
    console.log('Actividades del día:', this.actividadesDelDia);
  }

  prevActividad() {
    if (this.actividades.length === 0) return;

    this.actividadActual =
      (this.actividadActual - 1 + this.actividades.length) % this.actividades.length;

    this.actividad = this.actividades[this.actividadActual];
  }


  nextActividad() {
    if (this.actividades.length === 0) return;

    this.actividadActual =
      (this.actividadActual + 1) % this.actividades.length;

    this.actividad = this.actividades[this.actividadActual];
  }

  confirmarActividad() {
    console.log(this.actividad);
    this.mostrarConfirmacion = true;
  }

  editarActividad(id: number) {
    this.router.navigate(['/edit-actividad', id]);
  }

  eliminarActividad() {
    const actividadAEliminar = this.actividadesDelDia[this.actividadActual];

    this.actividades = this.actividades.filter(
      act => act !== actividadAEliminar
    );

    // Guardar en localStorage
    localStorage.setItem('actividades', JSON.stringify(this.actividades));

    // Volver a filtrar actividades del día actual
    this.actividadesDelDia = this.actividades.filter(
      act => act.fechaISO === this.fechaSeleccionada
    );

    if (this.actividadesDelDia.length > 0) {
      this.actividadActual = 0;
      this.actividad = this.actividadesDelDia[0];
    } else {
      this.actividad = null;
    }

    this.mostrarEleminacion = false; // Ocultar confirmación
    this.mostrarConfirmacion = false; // Ocultar confirmación de actividad
    console.log('Actividad eliminada');
  }

  async confirmarEliminacionActividad() {
    this.mostrarEleminacion = true;
  }

  agregarActividad() {
    if (!this.fechaSeleccionada) return;
    localStorage.setItem('fechaSeleccionada', this.fechaSeleccionada);
    this.router.navigate(['/edit-control']);
  }

  actualizarCalendario() {
    this.cargarActividades(); // Recargamos las actividades
    this.cdr.detectChanges();  // Forzamos la actualización de la vista
  }

  cancelarEliminacion() {
    this.mostrarEleminacion = false;
  }
}
