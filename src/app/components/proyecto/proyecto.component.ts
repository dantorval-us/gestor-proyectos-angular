import { Component, ElementRef, Input } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent {

  @Input() proyectoId: string|undefined;
  @Input() nombre: string = "";

  modoEdicion = false;

  constructor(
    private proyectoService: ProyectoService,
  ) {};

  updateProyecto() {
    this.proyectoService.updateProyecto(this.proyectoId!, this.nombre);
    this.modoEdicion = false;
  }

  cambiaModoEdicion(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.modoEdicion = true;
  }

  deleteProyecto(event: Event, id: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.proyectoService.deleteProyecto(id);
  }

  stopPropagation(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  closeMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.closeMenu();
  }

  enfocarNombre(): void {
    setTimeout(() => {
      document.getElementById("nombre")?.focus()
    }, 0);
  }

}
