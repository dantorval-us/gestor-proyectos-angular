import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent {

  formulario: FormGroup;
  proyectoId = this.data.proyectoId;
  nombre = this.data.nombre;
  descripcion = this.data.descripcion;
  editNombre: boolean = false;

  constructor(
    private proyectoService: ProyectoService,
    public dialogRef: MatDialogRef<EditarProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      nombre: this.nombre,
      descripcion: this.descripcion
    });
  };

  handleCheckNombre() {
    this.nombre = this.formulario.get('nombre')!.value;
    this.cambiarEditNombre();
  }

  cambiarEditNombre() {
    this.editNombre = !this.editNombre;
  }

  async updateProyecto() {
    this.proyectoService.updateProyecto(
      this.proyectoId!, 
      this.formulario.value.nombre, 
      this.formulario.value.descripcion
    );
  }

  enfocarNombre(): void {
    setTimeout(() => {
      document.getElementById("nombre")?.focus()
    }, 0);
  }

}
