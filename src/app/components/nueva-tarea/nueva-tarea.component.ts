import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-nueva-tarea',
  templateUrl: './nueva-tarea.component.html',
  styleUrls: ['./nueva-tarea.component.css']
})
export class NuevaTareaComponent implements OnInit{

  modoCrear = false;
  formulario: FormGroup;
  @Input() columna: string | undefined;

  constructor(
    private tareaService:TareaService,
    ) {
      this.formulario = new FormGroup({
        nombreTarea: new FormControl(),
        columna: new FormControl(),
      })
  };

  ngOnInit() {
  };

  async addTarea() {
    if (!this.formulario.value.nombreTarea) { return; }
    await this.formulario.get('columna')?.setValue(this.columna);
    this.formulario.value.posicion = await this.addPosicionTarea();
    await this.tareaService.addTarea(this.formulario.value);
    this.formulario.reset();
  }

  async addPosicionTarea() {
    let pos = await this.tareaService.getNumTareasColumna(this.columna!);
    if(pos == 0) {
      return 1;
    } else {
      return pos + 1;
    };
  };

  cambiaCrearTarea() {
    setTimeout(() => {
      this.modoCrear = !this.modoCrear;
    }, 0);
  }

  enfocarCrearTarea(): void {
    setTimeout(() => {
      document.getElementById("nombreTarea")?.focus()
    }, 0);
  }

  submitForm() {
    this.addTarea();
  }

}
