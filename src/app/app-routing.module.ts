import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { AuthGuardService } from './auth/guard/auht-services.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: 'auth', canActivate: [AuthGuard], loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule) },
  { path: 'dashboard', component: DashboardComponent, data: {expectedRol: ['EJECUTIVO']}, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: 'auth' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
