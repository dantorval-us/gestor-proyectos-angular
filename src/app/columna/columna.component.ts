import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, Output, NgModule, OnInit, EventEmitter, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Tarea } from '../models/tarea';
import { ColumnaService } from '../services/columna.service';
import { TareaService } from '../services/tarea.service';
import { TareaInterface } from '../interfaces/tarea.interface';

@Component({
  selector: 'app-columna',
  templateUrl: './columna.component.html',
  styleUrls: ['./columna.component.css']
})

export class ColumnaComponent implements OnInit {

  @Input() columnaId: string|undefined;
  @Input() nombre: string = "";
  @Input() posicion: number|undefined;
  tareas: TareaInterface[] = [];
  tareasColumna: TareaInterface[] = []
  modoEdicion = false;

  formulario: FormGroup;

  constructor(
    private columnaService:ColumnaService, 
    private tareaService:TareaService
  ) {
      this.formulario = new FormGroup({
        nombreTarea: new FormControl(),
        columna: new FormControl(this.columnaId!),
      })
    };

  ngOnInit(): void {
    if(this.columnaId) {this.getTareasColumna()};
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

  addTarea() {
    if (!this.formulario.value.nombreTarea) { return; }
    
    this.formulario.get('columna')?.setValue(this.columnaId); 
    
    this.tareaService.addTarea(this.formulario.value);
  }

  getTareas() { // se podría borrar? y el this.tareas?
    this.tareaService.getTareas().subscribe(tareas => {
      this.tareas = tareas;
    })
  }

  getTareasColumna() {
    this.tareaService.getTareasColumna(this.columnaId!).subscribe(tareas => {
      this.tareasColumna = tareas;
    });
  }
 
}
