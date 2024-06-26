import { Component, OnInit } from '@angular/core';
import { ColumnaInterface } from '../../interfaces/columna.interface';
import { ColumnaService } from '../../services/columna.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';
import { MatDialog } from '@angular/material/dialog';
import { NuevaColumnaComponent } from '../nueva-columna/nueva-columna.component';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})

export class TableroComponent implements OnInit {

  columnas: ColumnaInterface[];
  idProyecto = String(this.route.snapshot.paramMap.get('id'));
  nombreProyecto: string = "";
  cargandoProyecto = true;

  constructor(
    private columnaService: ColumnaService,
    private proyectoService: ProyectoService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.columnas = [{
      nombre: '',
      posicion: 0,
      proyecto: ''
    }];
  };

  ngOnInit(): void {
    this.getProyecto();
    this.getColumnas();
  }

  async getProyecto() {
    this.nombreProyecto = await this.proyectoService.getProyecto(this.idProyecto);
    this.cargandoProyecto = false;
  }

  getColumnas() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.columnaService.getColumnas(id).subscribe(columnas => {
      this.columnas = columnas;
    })
  }
  
  drop(event: CdkDragDrop<ColumnaInterface[]>) {
    const posPrevia = event.previousIndex;
    const posNueva = event.currentIndex;
    const columnaId = event.item.data.columnaId;
    moveItemInArray(this.columnas, posPrevia, posNueva);
    this.columnaService.updatePosicionColumnaTransaction(columnaId, posPrevia, posNueva, this.idProyecto);
  }

  openDialog(): void {
    this.dialog.open(NuevaColumnaComponent, {
      data: {idProyecto: this.route.snapshot.paramMap.get('id')}
    });
  }

}
