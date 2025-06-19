import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarioServiceService {
  private actualizar$ = new BehaviorSubject<void>(undefined);
  get actualizarCalendario$() {
    return this.actualizar$.asObservable();
  }
  emitirActualizacion() {
    this.actualizar$.next();
  }
}
