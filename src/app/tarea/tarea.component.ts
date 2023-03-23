import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Tablero } from '../models/tablero';
import { Columna } from '../models/columna';
import { Tarea } from '../models/tarea';
import { TareaService } from '../services/tarea.service';
import { TAREAS } from '../mocks';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css'],
})
export class TareaComponent implements OnInit {

  @Input() tareaId: number = 0;
  nombre: string = "";
  tareas = TAREAS;

  constructor(private tareaService:TareaService ) {};

  ngOnInit(): void {
    this.nombre = this.tareaService.getTarea(this.tareaId).nombre;
  }
 

}
