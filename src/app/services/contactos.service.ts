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
  private apiUrl = '/v1/contactos';

  constructor(private http: HttpClient) { }

  obtenerContactos(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(this.apiUrl);
  }
}
