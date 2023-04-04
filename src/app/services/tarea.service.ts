import { Injectable } from '@angular/core';
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  tarea!: Tarea;
  tareasColumna: Tarea[] = [];

  constructor() { }

}
