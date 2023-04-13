import { Component, Input, OnInit } from '@angular/core';
import { TareaService } from '../services/tarea.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css'],
})
export class TareaComponent implements OnInit {

  @Input() tareaId: string|undefined;
  @Input() nombre: string = "";

  constructor(private tareaService:TareaService ) {};

  modoEdicion = false;

  ngOnInit(): void {
  }

  updateTarea() {
    this.tareaService.updateTarea(this.tareaId!, this.nombre);
    this.modoEdicion = false;
  }

  cambiaModoEdicion() {
    this.modoEdicion = true;
  }

  deleteTarea() {
    this.tareaService.deleteTarea(this.tareaId!);
  }
 

}
