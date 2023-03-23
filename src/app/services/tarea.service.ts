import { Injectable } from '@angular/core';
import { TAREAS } from '../mocks';
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  tareas = TAREAS;
  tarea!: Tarea;
  tareasColumna: Tarea[] = [];

  constructor() { }

  getTareasColumna(id:number): Tarea[] {
    this.tareasColumna = this.tareas.filter(tarea => tarea.columna === id)!;
    return this.tareasColumna;
  }

  getTarea(id:number): Tarea {
    this.tarea = this.tareas.find(tarea => tarea.id === id)!;
    return this.tarea;
  }

}
