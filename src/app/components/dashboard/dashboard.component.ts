import { Component, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { ProyectoInterface } from 'src/app/interfaces/proyecto.interface';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  proyectos: ProyectoInterface[] = [];
  auth = getAuth().currentUser?.uid;

  constructor(
    private proyectoService:ProyectoService
    ) {};

  ngOnInit(): void {
    this.getProyectos();
  }

  getProyectos() {
    this.proyectoService.getProyectos(this.auth!).subscribe(proyectos => {
      this.proyectos = proyectos;
    });
  }

}
