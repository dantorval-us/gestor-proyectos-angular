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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { NuevaColumnaComponent } from './components/nueva-columna/nueva-columna.component';

@NgModule({
  declarations: [
    AppComponent,
    TareaComponent,
    ColumnaComponent,
    TableroComponent,
    NuevaColumnaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [TareaService, ColumnaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
