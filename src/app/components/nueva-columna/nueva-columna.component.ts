import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColumnaInterface } from 'src/app/interfaces/columna.interface';
import { ColumnaService } from 'src/app/services/columna.service';

@Component({
  selector: 'app-nueva-columna',
  templateUrl: './nueva-columna.component.html',
  styleUrls: ['./nueva-columna.component.css']
})
export class NuevaColumnaComponent implements OnInit {

  formulario: FormGroup;
  columnas: ColumnaInterface[] = [];
  posicion: number = 0;
  idProyecto = String(this.route.snapshot.paramMap.get('id'));

  constructor(
    private columnaService:ColumnaService,
    private route: ActivatedRoute
  ) {
    this.formulario = new FormGroup({
      nombre: new FormControl(),
    })
  };

  ngOnInit(): void {
  }

  async addColumna() {
    if (!this.formulario.value.nombre) { return; }
    this.formulario.value.proyecto = this.idProyecto;
    this.formulario.value.posicion = await this.getPosicion();
    await this.columnaService.addColumna(this.formulario.value);
  }

  async getPosicion() {
    let pos = await this.columnaService.getNumColumnas(this.idProyecto); 
    
    if(pos == 0) {
      return 1;
    } else {
      return new Promise(async (resolve, reject) => {
        (await this.columnaService.getLastPosicion(this.idProyecto)).subscribe(columnas => {
          pos = columnas[0].posicion + 1;
          resolve(pos);
        }, error => {
          reject(error);
        });
      });
    }
  }  

}
