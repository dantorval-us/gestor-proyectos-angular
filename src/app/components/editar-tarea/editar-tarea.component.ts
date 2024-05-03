import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.component.html',
  styleUrls: ['./editar-tarea.component.css']
})
export class EditarTareaComponent implements OnInit {

  formulario: FormGroup;
  tareaId = this.data.tareaId;
  nombre = this.data.nombre;
  descripcion = this.data.descripcion;
  estimacion = this.data.estimacion;
  icono = this.data.icono;
  editNombre: boolean = false;
  estimacionOpciones: any[] = [];
  iconos: { nombre: string, valor: string }[] = [];

  constructor(
    private dataService: DataService,
    private tareaService: TareaService,
    public dialogRef: MatDialogRef<EditarTareaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      nombre: this.nombre,
      descripcion: this.descripcion,
      estimacion: this.estimacion,
    });
  };

  ngOnInit(): void {
    console.log('...', this.icono);
    this.dataService.getOptions().subscribe(data => {
      this.estimacionOpciones = data;
    });
    this.dataService.getIconos().subscribe(data => {
      this.iconos = data;
    });
  }

  updateTarea() {
    console.log('update:', this.icono);
    this.tareaService.updateTarea(
      this.tareaId,
      this.formulario.value.nombre,
      this.formulario.value.descripcion,
      this.estimacion,
      this.icono.valor
    );
  }

  handleCheckNombre() {
    this.nombre = this.formulario.get('nombre')!.value;
    this.cambiarEditNombre();
  }

  cambiarEditNombre() {
    this.editNombre = !this.editNombre;
  }

  enfocarNombre(): void {
    setTimeout(() => {
      document.getElementById("nombre")?.focus()
    }, 0);
  }

  handleSetEstimacion(puntos: number) {
    this.estimacion = puntos;
  }

  handleSetIcono(icono: { nombre: string, valor: string } | null = null) {
    this.icono = icono;
  }

}