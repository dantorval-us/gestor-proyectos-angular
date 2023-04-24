import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.css']
})
export class NuevoProyectoComponent {

  formulario: FormGroup;

  constructor(
    private columnaService:ProyectoService
    ) {
      this.formulario = new FormGroup({
        nombre: new FormControl(),
      })
    };

  addProyecto() {
    if (!this.formulario.value.nombre) { return; }
    this.columnaService.addProyecto(this.formulario.value);
  }

}
