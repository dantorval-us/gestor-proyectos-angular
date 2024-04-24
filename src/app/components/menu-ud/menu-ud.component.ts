import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-menu-ud',
  templateUrl: './menu-ud.component.html',
  styleUrls: ['./menu-ud.component.css']
})
export class MenuUDComponent {

  @Input() orientacion: string = "";
  @Input() propagation: boolean = false;

  @Output() editarEvent = new EventEmitter<Event>();
  @Output() eliminarEvent = new EventEmitter<Event>();
  @Output() cierraMenu = new EventEmitter<Event>();
  
  editar(event: Event) {
    this.editarEvent.emit(event);
    this.enfocarNombre();
  }

  eliminar(event: Event) {
    this.eliminarEvent.emit(event);
  }

  menuClosed() {
    this.cierraMenu.emit();
  }

  stopPropagation(event: MouseEvent) {
    if(this.propagation==false) {
      event.preventDefault();
      event.stopPropagation();
    }
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
