import { Component, Input, OnInit } from '@angular/core';
import { TareaService } from '../services/tarea.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css'],
})
export class TareaComponent implements OnInit {

  @Input() tareaId: number = 0;
  nombre: string = "";

  constructor(private tareaService:TareaService ) {};

  ngOnInit(): void {
  }
 

}
