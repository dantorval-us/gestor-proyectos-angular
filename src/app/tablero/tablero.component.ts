import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { COLUMNAS } from '../mocks';
import { Columna } from '../models/columna';
import { ColumnaService } from '../services/columna.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})

export class TableroComponent implements OnInit {

  nombreProyecto: string = "Gestor de proyectos";
  columnas: Columna[] = [];
  nuevaColumnaVisible = false;

  constructor(private columnaService:ColumnaService){};

  ngOnInit(): void {
    this.columnas = this.columnaService.getColumnas();
  }

  addColumnaVacia() {
    this.nuevaColumnaVisible = !this.nuevaColumnaVisible;
  }

}
