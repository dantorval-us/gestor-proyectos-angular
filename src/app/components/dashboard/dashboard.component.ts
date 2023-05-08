import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getAuth } from 'firebase/auth';
import { ProyectoInterface } from 'src/app/interfaces/proyecto.interface';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { NuevoProyectoComponent } from '../nuevo-proyecto/nuevo-proyecto.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  proyectos: ProyectoInterface[] = [];
  auth = getAuth().currentUser?.uid;

  constructor(
    private proyectoService:ProyectoService,
    public dialog: MatDialog
    ) {};

  ngOnInit(): void {
    this.getProyectos();
  }

  getProyectos() {
    this.proyectoService.getProyectos(this.auth!).subscribe(proyectos => {
      this.proyectos = proyectos;
    });
  }

  openDialog(): void {
    this.dialog.open(NuevoProyectoComponent, {
      data: {},
    });
  }

}
