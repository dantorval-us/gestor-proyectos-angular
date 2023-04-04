import { Component, OnInit } from '@angular/core';
import { ColumnaInterface } from '../interfaces/columna.interface';
import { ColumnaService } from '../services/columna.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})

export class TableroComponent implements OnInit {

  nombreProyecto: string = "Gestor de proyectos";
  columnas: ColumnaInterface[];

  constructor(
    private columnaService:ColumnaService
  ) {
    this.columnas = [{
      nombre: '',
      posicion: 0
    }];
  };

  ngOnInit(): void {
    this.getColumnas();
  }

  getColumnas() {
    this.columnaService.getColumnas().subscribe(columnas => {
      this.columnas = columnas;
    })
  }

}
