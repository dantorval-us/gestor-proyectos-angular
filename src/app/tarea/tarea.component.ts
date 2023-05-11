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
  @Input() posicion: number = 0;
  @Input() idColumna: string = "";

  constructor(private tareaService:TareaService ) {};

  modoEdicion:boolean = false;
  muestraBtnMas:boolean = false;
  desplegado:boolean = false;

  ngOnInit(): void {
  }

  updateTarea() {
    this.tareaService.updateTarea(this.tareaId!, this.nombre);
    this.modoEdicion = false;
  }

  deleteTarea() {
    this.tareaService.deleteTarea(this.tareaId!, this.posicion, this.idColumna);
  }
  
  cambiaModoEdicion(): void {
    this.modoEdicion = !this.modoEdicion;
  }

  enfocarNombre(): void {
    setTimeout(() => {
      document.getElementById("nombre")?.focus()
    }, 0);
  }

  mostrarBtnMas() {
    this.muestraBtnMas = true;
  }

  ocultaBtnMas() {
    if(this.desplegado==false) {
      this.muestraBtnMas = false;
    }
  }

  despliega() {
    this.desplegado = true;
    setTimeout(() => {
      this.desplegado = false;
    }, 300);
  }

}
