import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { AuthGuardService } from './auth/guard/auht-services.guard';

const routes: Routes = [
  { path: 'login',canActivate: [AuthGuard], component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, data: {expectedRol: ['EJECUTIVO']}, canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
