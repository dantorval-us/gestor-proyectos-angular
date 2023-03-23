import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { TAREAS } from '../mocks';
import { Tarea } from '../models/tarea';
import { ColumnaService } from '../services/columna.service';
import { TareaService } from '../services/tarea.service';

@Component({
  selector: 'app-columna',
  templateUrl: './columna.component.html',
  styleUrls: ['./columna.component.css']
})

export class ColumnaComponent implements OnInit {

  @Input() columnaId = 0;
  nombre: string = "";
  tareas = TAREAS;
  tareasColumna: Tarea[] = [];

  constructor(private columnaService:ColumnaService, private tareaService:TareaService) {};

  ngOnInit(): void {
    this.nombre = this.columnaService.getColumna(this.columnaId).nombre;
    this.tareasColumna = this.tareaService.getTareasColumna(this.columnaId);
  };

  drop(event: CdkDragDrop<Tarea[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
 
}
