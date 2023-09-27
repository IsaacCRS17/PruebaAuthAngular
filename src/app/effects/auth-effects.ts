import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, tap  } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import * as AuthActions from '../auth/actions/auth.actions';
import { Router } from '@angular/router';
import { TokenService } from '../auth/services/token.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.login),
    mergeMap((action) =>
      this.authService.login(action.username, action.password).pipe(
        map((data) => {
          // Agrega la lógica de redirección aquí después del inicio de sesión exitoso
          this.tokenService.setToken(data.accessToken);
          this.router.navigate(['/dashboard']); // Redirige al usuario a la página de dashboard
          return AuthActions.loginSuccess(); // Devuelve la acción de éxito
        }),
        catchError((error) => EMPTY) // En caso de error
      )
    )
  )
);

}
