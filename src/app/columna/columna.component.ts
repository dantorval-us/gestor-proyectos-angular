import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    this.columnaId?.length && this.getTareasColumna();
  };

  updateColumna(id:string):void {
      this.columnaService.updateColumna(id, this.nombre);
      this.modoEdicion = false;
  }

  cambiaModoEdicion():void {
    this.modoEdicion = true;
  }

  deleteColumna(id: string):void {
    this.columnaService.deleteColumna(id);
    this.updateIndices(id);
  }

  updateIndices(id: string):void {
    this.columnaService.updateIndicesService(id, this.posicion!);
  }

  /* Tareas: */
  drop(event: CdkDragDrop<TareaInterface[]>):void {
    const columnaId = this.columnaId!;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.tareaService.updateAllPosicionesColumna(columnaId, event.container.data);//
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
        );
      this.tareaService.dropTransaction(event.item.data.tareaId, columnaId, event.container.data, event.previousContainer.data, event.currentIndex);
    }
  }

  async addTarea() {
    if (!this.formulario.value.nombreTarea) { return; }
    this.formulario.get('columna')?.setValue(this.columnaId);
    this.formulario.value.posicion = await this.addPosicionTarea();
    this.tareaService.addTarea(this.formulario.value);
  }

  async addPosicionTarea() {
    let pos = await this.tareaService.getNumTareasColumna(this.columnaId!);
    if(pos == 0) {
      return 1;
    } else {
      return pos + 1;
    };
  };

  getTareasColumna():void {
    this.tareaService.getTareasColumna(this.columnaId!).subscribe(tareas => {
      this.tareasColumna = tareas;
    });
  }

}
