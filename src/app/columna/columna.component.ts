import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, Output, NgModule, OnInit, EventEmitter, HostListener } from '@angular/core';
import { Tarea } from '../models/tarea';
import { ColumnaService } from '../services/columna.service';
import { TareaService } from '../services/tarea.service';

@Component({
  selector: 'app-columna',
  templateUrl: './columna.component.html',
  styleUrls: ['./columna.component.css']
})

export class ColumnaComponent implements OnInit {

  @Input() columnaId: string|undefined;
  @Input() nombre: string = "";
  @Input() posicion: number|undefined;
  tareasColumna: Tarea[] = [];
  modoEdicion = false;

  constructor(private columnaService:ColumnaService, private tareaService:TareaService) {};

  ngOnInit(): void {
  };

  updateColumna(id:string) {
      this.columnaService.updateColumna(id, this.nombre);
      this.modoEdicion = false;
  }

  cambiaModoEdicion(id:string) {
    this.modoEdicion = true;
  }

  deleteColumna(id: string) {
    this.columnaService.deleteColumna(id);
    this.updateIndices(id);
  }

  updateIndices(id: string) {
    this.columnaService.updateIndicesService(id, this.posicion!);
  }
  
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
