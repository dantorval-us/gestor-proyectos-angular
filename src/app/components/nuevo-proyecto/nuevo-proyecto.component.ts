import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getAuth } from 'firebase/auth';
import { ProyectoInterface } from 'src/app/interfaces/proyecto.interface';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.css']
})
export class NuevoProyectoComponent implements OnInit {

  formulario: FormGroup;
  auth = getAuth().currentUser?.uid;
  crearTablero = false;

  @Input() numProyectos!: number;

  nombreFormControl = new FormControl('', [Validators.required]);

  constructor(
    private columnaService:ProyectoService,
    public dialogRef: MatDialogRef<NuevoProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProyectoInterface,
    ) {
      this.formulario = new FormGroup({
        nombre: new FormControl(),
      })
    };

  ngOnInit(): void {
  }

  addProyecto() {
    if (!this.formulario.value.nombre) { return; }
    this.formulario.value.usuario = this.auth;
    this.columnaService.addProyecto(this.formulario.value);
  }

  cambiaCrearTablero(event: Event) {
    setTimeout(() => {
      this.crearTablero = !this.crearTablero;
    }, 0);
  }

  enfocarNombre(): void {
    setTimeout(() => {
      document.getElementById("nombreTablero")?.focus()
    }, 0);
  }

  onCrear(): void {
    if(this.formulario.value.nombre != null) {
      this.dialogRef.close();
    }
  }

}
