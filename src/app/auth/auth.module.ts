import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule o ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
