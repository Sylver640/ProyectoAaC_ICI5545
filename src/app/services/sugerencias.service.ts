import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SugerenciaResponse {
  consejos: string[];
  status: number;
}
@Injectable({
  providedIn: 'root'
})


export class SugerenciasService {
  private apiUrl = 'http://135.232.120.200:8080/v1/sugerencias';

  constructor(private http: HttpClient) { }

  listarConsejos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listar`);
  }

  listarConsejosPorEdadYCategoria(edad: string, categoria: string): Observable<SugerenciaResponse> {
    return this.http.post<SugerenciaResponse>(`${this.apiUrl}/por_edad_categoria`, { edad, categoria });
  }

  listarConsejosPorEdad(edad: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/por_edad`, { edad });
  }
}
