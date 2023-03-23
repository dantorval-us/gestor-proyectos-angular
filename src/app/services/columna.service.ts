import { Injectable } from '@angular/core';
import { COLUMNAS } from '../mocks';
import { Columna } from '../models/columna';

@Injectable({
  providedIn: 'root'
})
export class ColumnaService {

  columnas = COLUMNAS;
  columna!: Columna;
  constructor() { }

  getColumnas(): Columna[] {
    return this.columnas;
  } 

  getColumna(id:number): Columna {
    this.columna = this.columnas.find(columna => columna.id === id)!
    return this.columna;
  }
}
