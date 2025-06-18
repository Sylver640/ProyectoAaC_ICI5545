import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contacto {
  nombre: string;
  telefono: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactosService {
  private apiUrl = 'http://135.232.120.200:8080/v1/contactos';

  constructor(private http: HttpClient) { }

  obtenerContactos(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(this.apiUrl);
  }
}
