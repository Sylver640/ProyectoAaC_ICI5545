import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HitoService {
  private apiUrl = 'http://135.232.120.200:8080/v1/hitos'; // Reemplaza con tu URL real

  constructor() { }

  listarHitosPorEdad(edad: string): Observable<string[]> {
    const options = {
      url: `${this.apiUrl}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: { hito: edad }
    };

    return from(
      CapacitorHttp.post(options).then(response => {
        console.log('Raw CapacitorHttp Response:', response);
        console.log('Response data type:', typeof response.data);
        console.log('Response data:', response.data);

        let parsedData = response.data;
        if (typeof response.data === 'string') {
          parsedData = JSON.parse(response.data);
        }
        return parsedData as string[];
      }).catch(error => {
        console.error('listarHitosPorEdad Error:', error);
        throw error;
      })
    );
  }
}