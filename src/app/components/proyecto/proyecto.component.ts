import { Component, Input } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { EditarProyectoComponent } from '../editar-proyecto/editar-proyecto.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
})
export class ProyectoComponent {

  @Input() proyectoId: string|undefined;
  @Input() nombre: string = "";
  @Input() descripcion: string = "";
  nombreEdit: string = '';

  constructor(
    private proyectoService: ProyectoService,
    public dialog: MatDialog,
  ) {};

  ngOnInit(): void {
    this.nombreEdit = this.nombre;
  }

  handleUpdate() {
    this.openDialog();
  }

  openDialog(): void {
    this.dialog.open(EditarProyectoComponent, {
      data: { proyectoId: this.proyectoId,
        nombre: this.nombre,
        descripcion: this.descripcion  
      },
      panelClass: ['editar-proyecto-dialog']
    });
  }

  eliminar(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.proyectoService.deleteProyecto(this.proyectoId!);
  }

  stopPropagation(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

}
