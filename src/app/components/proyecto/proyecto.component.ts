import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent {

  //@Input() proyectoId: string|undefined;
  @Input() nombre: string = "";

}
