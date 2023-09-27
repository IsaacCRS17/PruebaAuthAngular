import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {    // Verificar si el usuario está autenticado (verificar el token, por ejemplo).

    if (this.tokenService.isLogged()) {
      //Para validar roles
      //if (this.tokenService.isEjecutive()) {
      //  console.log("is ejecutive")
      //  this.router.navigate(['/dashboard']);
      //  return false;
      //}

      //Para validar con un solo rol
      this.router.navigate(['/dashboard']);
       return false;
    }
    return true;
  }
}
