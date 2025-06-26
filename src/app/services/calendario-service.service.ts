import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { CapacitorHttp } from '@capacitor/core';

interface ActividadResponse {
  tipo: string;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  edadEvento: string;
  fechaTentativa: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarioServiceService {

  private apiUrl = 'http://135.232.120.200:8080/v1/actividades';
  private actualizar$ = new BehaviorSubject<void>(undefined);

  constructor() { }
  
  listarConsejos(fecha: string): Observable<ActividadResponse[]> {
    const options = {
      url: `${this.apiUrl}/salud`,
      headers: {
        'Content-Type': 'application/json',
      },
       data: { fechaNacimiento: fecha }
    };
  
    return from(
      CapacitorHttp.post(options).then(response => {
      console.log('Raw CapacitorHttp Response:', response);
      console.log('Response data type:', typeof response.data);
        
      // Parse JSON if it's a string
      let parsedData = response.data;
      if (typeof response.data === 'string') {
        try {
          parsedData = JSON.parse(response.data);
        } catch (e) {
          console.error('Error parsing JSON:', e);
          throw e;
        }
      }

      if(!Array.isArray(parsedData)){
        throw new Error("Repuesta inesperada, se esperaba un array");
      }
        
      return parsedData as ActividadResponse[];
      }).catch(error => {
        console.error('listarConsejos Error:', error);
        throw error;
      })
    );
  }

  get actualizarCalendario$() {
    return this.actualizar$.asObservable();
  }
  emitirActualizacion() {
    this.actualizar$.next();
  }
}
