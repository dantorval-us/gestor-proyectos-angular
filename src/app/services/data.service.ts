import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getOptions(): Observable<any[]> {
    return this.http.get<any[]>('assets/data/puntos-estimacion.json');
  }

  getIconos(): Observable<{nombre: string, valor: string}[]> {
    return this.http.get<{ nombre: string, valor: string }[]>('assets/data/iconos-tarea.json');
  }

  getIcono(valor: string): Observable<{ nombre: string, valor: string } | undefined> {
    return this.http.get<{ nombre: string, valor: string }[]>('assets/data/iconos-tarea.json').pipe(
      map(iconos => iconos.find(icono => icono.valor === valor))
    );
  }

}
