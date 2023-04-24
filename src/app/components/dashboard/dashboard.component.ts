import { Component, OnInit } from '@angular/core';
import { ProyectoInterface } from 'src/app/interfaces/proyecto.interface';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  proyectos: ProyectoInterface[] = [];

  constructor(
    private proyectoService:ProyectoService
    ) {
    };

  ngOnInit(): void {
    this.getProyectos();
  }

  getProyectos() {
    this.proyectoService.getProyectos().subscribe(proyectos => {
      this.proyectos = proyectos;
    });
  }

}
