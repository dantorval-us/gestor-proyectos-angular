import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.component.html',
  styleUrls: ['./editar-tarea.component.css']
})
export class EditarTareaComponent {

  formulario: FormGroup;
  tareaId = this.data.tareaId;
  nombre = this.data.nombre;
  descripcion = this.data.descripcion;
  editNombre: boolean = false;

  constructor(
    private tareaService: TareaService,
    public dialogRef: MatDialogRef<EditarTareaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      nombre: this.nombre,
      descripcion: this.descripcion
    });
  };

  updateTarea() {
    this.tareaService.updateTarea(
      this.tareaId,
      this.formulario.value.nombre,
      this.formulario.value.descripcion
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

}
