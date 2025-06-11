import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Actividad {
  idactividad: string;
  titulo: string;
  tipo: string;
  fecha: string;
  rango_inicio: string;
  rango_final: string;
  locación: string;
  recordatorio: string;
  fecha_recordatorio: string;
  esta_completada: number;
  idInfante: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  private apiUrl = '/v1/actividades';

  constructor(private http: HttpClient) { }

  listarActividades(idInfante: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/listar`, { idInfante });
  }

  crearActividad(actividad: Actividad): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear`, actividad);
  }

  editarActividad(actividad: Partial<Actividad> & { idactividad: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/editar`, actividad);
  }

  eliminarActividad(idActividad: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/eliminar`, { idActividad });
  }

  marcarCompletada(idActividad: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/completar`, { idActividad });
  }
}
