import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { authInterceptorProvider } from './interceptors/interceptor-auth.service';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth-effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    AuthModule,
    SharedModule,
    AuthRoutingModule,
    AppRoutingModule,
    StoreModule.forRoot({}), // Configura el módulo Store
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [authInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
