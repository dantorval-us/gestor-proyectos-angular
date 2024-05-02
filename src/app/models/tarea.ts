export class Tarea {
    constructor(
        public id: string, 
        public nombre: string, 
        public columna: string,
        public posicion: number,
        public descripcion: string,
        public estimacion: number,
        public icono: string,
    ) {}
}