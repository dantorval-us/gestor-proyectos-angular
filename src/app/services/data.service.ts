import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

}
