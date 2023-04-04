import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, NgModule, OnInit } from '@angular/core';
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
  tareasColumna: Tarea[] = [];
  modoEdicion = false;

  constructor(private columnaService:ColumnaService, private tareaService:TareaService) {};

  ngOnInit(): void {
  };

  updateColumna(id:string) {
      console.log("modo edicion -> lectura")
      this.columnaService.updateColumna(id, this.nombre);
      this.modoEdicion = false;
  }

  cambiaModoEdicion(id:string) {
    console.log("modo lectura -> edicion")
    this.modoEdicion = true;
  }

  async deleteColumna(id: string) {
    const response = await this.columnaService.deleteColumna(id);
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
