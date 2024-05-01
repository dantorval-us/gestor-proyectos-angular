import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TareaComponent } from './components/tarea/tarea.component';
import { ColumnaComponent } from './components/columna/columna.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { TareaService } from './services/tarea.service';
import { ColumnaService } from './services/columna.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { NuevaColumnaComponent } from './components/nueva-columna/nueva-columna.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { NuevoProyectoComponent } from './components/nuevo-proyecto/nuevo-proyecto.component';
import { LoginComponent } from './components/login/login.component';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { ProyectoService } from './services/proyecto.service';
import { NuevaTareaComponent } from './components/nueva-tarea/nueva-tarea.component';
import { MenuUDComponent } from './components/menu-ud/menu-ud.component';
import { EditarProyectoComponent } from './components/editar-proyecto/editar-proyecto.component';

@NgModule({
  declarations: [
    AppComponent,
    TareaComponent,
    ColumnaComponent,
    TableroComponent,
    NuevaColumnaComponent,
    DashboardComponent,
    ProyectoComponent,
    NuevoProyectoComponent,
    LoginComponent,
    NuevaTareaComponent,
    MenuUDComponent,
    EditarProyectoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  providers: [
    TareaService, 
    ColumnaService,
    ProyectoService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
