import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ColumnaService } from '../../services/columna.service';
import { TareaService } from '../../services/tarea.service';
import { TareaInterface } from '../../interfaces/tarea.interface';
import { ActivatedRoute } from '@angular/router';

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
  idProyecto = String(this.route.snapshot.paramMap.get('id'));

  constructor(
    private columnaService:ColumnaService,
    private tareaService:TareaService,
    private route: ActivatedRoute
  ) {
  };

  ngOnInit(): void {
    this.columnaId?.length && this.getTareasColumna();
  };

  updateColumna(id:string):void {
      this.columnaService.updateColumna(id, this.nombre);
      this.modoEdicion = false;
  }

  cambiaModoEdicion():void {
    this.modoEdicion = !this.modoEdicion;
    this.enfocarNombre();
  }

  deleteColumna(id: string):void {
    this.columnaService.deleteColumna(id);
    this.updateIndices(this.idProyecto);
  }

  updateIndices(idProyecto:string):void {
    this.columnaService.updateIndicesService(this.posicion!, idProyecto);
  }
  
  enfocarNombre(): void {
    setTimeout(() => {
      document.getElementById("nombre")?.focus()
    }, 0);
  }
  
  /* Tareas: */
  drop(event: CdkDragDrop<TareaInterface[]>):void {
    const columnaId = this.columnaId!;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.tareaService.updateAllPosicionesColumna(columnaId, event.container.data);
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

  getTareasColumna():void {
    this.tareaService.getTareasColumna(this.columnaId!).subscribe(tareas => {
      this.tareasColumna = tareas;
    });
  }

}
