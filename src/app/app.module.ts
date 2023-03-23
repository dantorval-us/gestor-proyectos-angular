import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TareaComponent } from './tarea/tarea.component';
import { ColumnaComponent } from './columna/columna.component';
import { TableroComponent } from './tablero/tablero.component';
import { TareaService } from './services/tarea.service';
import { ColumnaService } from './services/columna.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TareaComponent,
    ColumnaComponent,
    TableroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule
  ],
  providers: [TareaService, ColumnaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
