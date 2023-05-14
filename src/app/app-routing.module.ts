import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { TableroComponent } from './components/tablero/tablero.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: DashboardComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  { path: 'login', component: LoginComponent, 
    ...canActivate(() => redirectLoggedInTo(['/'])) },
  { path: 'proyecto/:id', component: TableroComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
