import { Component, Input, OnInit } from '@angular/core';
import { TareaService } from '../../services/tarea.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarTareaComponent } from '../editar-tarea/editar-tarea.component';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css'],
})
export class TareaComponent implements OnInit {

  @Input() tareaId: string|undefined;
  @Input() idColumna: string = "";
  @Input() nombre: string = "";
  @Input() descripcion: string = "";
  @Input() posicion: number = 0;

  constructor(
    private tareaService:TareaService, 
    public dialog: MatDialog
  ) {};

  modoEdicion:boolean = false;
  muestraBtnMas:boolean = false;
  desplegado:boolean = false;

  ngOnInit(): void {
  }

  deleteTarea() {
    this.tareaService.deleteTarea(this.tareaId!, this.posicion, this.idColumna);
  }

  handleUpdate() {
    this.openDialog();
  }

  openDialog(): void {
    this.dialog.open(EditarTareaComponent, {
      data: {
        tareaId: this.tareaId,
        nombre: this.nombre,
        descripcion: this.descripcion 
      },
      panelClass: []
    });
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
