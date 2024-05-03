import { Component, Input, OnInit } from '@angular/core';
import { TareaService } from '../../services/tarea.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarTareaComponent } from '../editar-tarea/editar-tarea.component';
import { DataService } from 'src/app/services/data.service';

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
  @Input() estimacion: number = 0;
  @Input() nombreIcono: string = "";
  @Input() posicion: number = 0;
  @Input() nombreColumna: string = "";
  icono: { nombre: string, valor: string } | undefined;

  constructor(
    private dataService: DataService,
    private tareaService:TareaService, 
    public dialog: MatDialog
  ) {};

  muestraBtnMas:boolean = false;
  desplegado:boolean = false;

  ngOnInit(): void {
    this.dataService.getIcono(this.nombreIcono).subscribe(data => {
      this.icono = data;
    });
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
        descripcion: this.descripcion,
        estimacion: this.estimacion,
        icono: this.icono
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
