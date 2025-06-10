import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Esta parte es para definir la interfaz de número de teléfono (número de teléfono)
export interface PhoneNumber {
  numero: string;
  horario: string;
  poblacion_preferente: string;
}

// Esta parte es para definir la interfaz de centro (centro)
export interface Centro {
  nombre: string;
  direccion: string;
  horario: string;
  telefono: PhoneNumber;
}

// Esta parte es para definir el servicio de centros (servicio de centros)
@Injectable({
  providedIn: 'root'
})

// Esta parte es para definir el servicio de centros (servicio de centros)
export class CentrosService {
  // Esta parte es para definir la URL de la API (URL de la API)
  private apiUrl = '/v1/centros_de_salud';
  
  // Esta parte es para definir el constructor del cliente HTTP (constructor HTTPClient)
  constructor(private http: HttpClient) { }

  // Esta parte es para realizar el llamado a la función de obtener centros (llamado función obtenerCentros
  obtenerCentros(): Observable<Centro[]> {
    return this.http.get<Centro[]>(this.apiUrl);
  }
}
