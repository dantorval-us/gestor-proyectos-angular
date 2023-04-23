import { Component, OnInit } from '@angular/core';
import { ColumnaInterface } from '../interfaces/columna.interface';
import { ColumnaService } from '../services/columna.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})

export class TableroComponent implements OnInit {

  nombreProyecto: string = "Gestor de proyectos";
  columnas: ColumnaInterface[];

  constructor(
    private columnaService: ColumnaService,
    private route: ActivatedRoute,
  ) {
    this.columnas = [{
      nombre: '',
      posicion: 0,
      proyecto: ''
    }];
  };

  ngOnInit(): void {
    this.getColumnas();
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
    this.updatePosicionColumna(columnaId, posPrevia, posNueva);
  }

  async updatePosicionColumna(id: string, posPrevia:number, posNueva:number) {
    const posPrevMasUno = posPrevia + 1;
    const posNueMasUno = posNueva + 1;
  
    if(posPrevia < posNueva) {
      for(let i=posPrevMasUno+1; i<=posNueMasUno; i++ ) {
        await this.columnaService.getColumnasIntermedias(i, true);
      }
    } else {
      for(let i=posPrevMasUno-1; i>=posNueMasUno; i-- ) {
        await this.columnaService.getColumnasIntermedias(i, false);
      }
    }

    this.columnaService.updatePosicion(id, posNueMasUno);
  }

}
