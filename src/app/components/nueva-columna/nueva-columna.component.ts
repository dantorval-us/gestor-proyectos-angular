import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  //idProyecto = String(this.route.snapshot.paramMap.get('id'));

  ventanaEmergente:boolean = false;
  nombreFormControl = new FormControl('', [Validators.required]);
  idProyecto = this.data.idProyecto;

  constructor(
    private columnaService:ColumnaService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<NuevaColumnaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
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
  
  onCrear(): void {
    if(this.formulario.value.nombre != null) {
      this.dialogRef.close();
    }
  }

}
