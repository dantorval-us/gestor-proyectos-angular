import { ColumnaInterface } from "../interfaces/columna.interface";

export class Columna implements ColumnaInterface {
  constructor(
    public id: string, 
    public nombre: string,
    public posicion: number,
    public proyecto: string
  ) {}
}