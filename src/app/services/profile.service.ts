import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Esta parte es para definir la interfaz de usuario (usuario)
export interface Usuario {
  id: string;
  nombre: string;
  fecha_nacimiento: string;
  genero: string;
}
// Esta parte es para definir el servicio (servicio de perfil)
@Injectable({
  providedIn: 'root'
})
// Esta parte es para definir el servicio (servicio de perfil)
export class ProfileService {
  // Esta parte es para definir la URL de la API (URL de la API)
  private apiUrl = '/v1/usuarios';
  // Esta parte es para definir el constructor (constructor del servicio)
  constructor(private http: HttpClient) { }

  // Esta parte es para definir el método listarUsuarios (listar todos los usuarios)
  listarUsuarios(): Observable<Usuario[]> {
    return this.http.post<Usuario[]>(`${this.apiUrl}/listar`, {});
  }
  // Esta parte es para definir el método crearUsuario (crear un usuario)
  crearUsuario(nombre: string, fecha_nacimiento: string, genero: string): Observable<{id: string, status: number}> {
    return this.http.post<{id: string, status: number}>(`${this.apiUrl}/crear`, {
      nombre,
      fecha_nacimiento,
      genero
    });
  }
  // Esta parte es para definir el método buscarUsuario (buscar un usuario)
  buscarUsuario(id: string): Observable<{usuario: Usuario, status: number} | {error: string, status: number}> {
    return this.http.post<{usuario: Usuario, status: number} | {error: string, status: number}>(`${this.apiUrl}/buscar`, { id });
  }
  // Esta parte es para definir el método editarUsuario (editar un usuario)
  editarUsuario(id: string, nombre?: string, fecha_nacimiento?: string, genero?: string): Observable<{mensaje: string, status: number} | {error: string, status: number}> {
    return this.http.post<{mensaje: string, status: number} | {error: string, status: number}>(`${this.apiUrl}/editar`, {
      id,
      nombre: nombre ?? '',
      fecha_nacimiento: fecha_nacimiento ?? '',
      genero: genero ?? ''
    });
  }
  // Esta parte es para definir el método eliminarUsuario (eliminar un usuario)
  eliminarUsuario(id: string): Observable<{mensaje: string, status: number} | {error: string, status: number}> {
    return this.http.delete<{mensaje: string, status: number} | {error: string, status: number}>(`${this.apiUrl}/eliminar`, { body: { id } });
  }
}
