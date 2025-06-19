import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { Observable, from } from 'rxjs';

interface SugerenciaResponse {
  consejos: string[];
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class SugerenciasService {
  private apiUrl = 'http://135.232.120.200:8080/v1/sugerencias';

  constructor() { }

  listarConsejos(): Observable<any> {
    const options = {
      url: `${this.apiUrl}/listar`,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    return from(
      CapacitorHttp.get(options).then(response => {
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
        
        return parsedData;
      }).catch(error => {
        console.error('listarConsejos Error:', error);
        throw error;
      })
    );
  }

  listarConsejosPorEdadYCategoria(edad: string, categoria: string): Observable<SugerenciaResponse> {
    const options = {
      url: `${this.apiUrl}/por_edad_categoria`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: { edad, categoria }
    };

    return from(
      CapacitorHttp.post(options).then(response => {
        console.log('Raw CapacitorHttp Response:', response);
        console.log('Response data type:', typeof response.data);
        console.log('Response data:', response.data);
        
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
        
        console.log('Parsed data:', parsedData);
        console.log('Parsed data type:', typeof parsedData);
        
        return parsedData as SugerenciaResponse;
      }).catch(error => {
        console.error('listarConsejosPorEdadYCategoria Error:', error);
        throw error;
      })
    );
  }

  listarConsejosPorEdad(edad: string): Observable<any> {
    const options = {
      url: `${this.apiUrl}/por_edad`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: { edad }
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
        
        return parsedData;
      }).catch(error => {
        console.error('listarConsejosPorEdad Error:', error);
        throw error;
      })
    );
  }
}