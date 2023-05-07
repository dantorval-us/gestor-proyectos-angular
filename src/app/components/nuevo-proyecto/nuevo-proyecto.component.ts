import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.css']
})
export class NuevoProyectoComponent {

  formulario: FormGroup;
  auth = getAuth().currentUser?.uid;

  constructor(
    private columnaService:ProyectoService
    ) {
      this.formulario = new FormGroup({
        nombre: new FormControl(),
      })
    };

  addProyecto() {
    if (!this.formulario.value.nombre) { return; }
    this.formulario.value.usuario = this.auth;
    this.columnaService.addProyecto(this.formulario.value);
  }

}
