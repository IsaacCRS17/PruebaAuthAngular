import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  realRol!: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data['expectedRol'];
    this.realRol = 'EJECUTIVO';

    if (!this.tokenService.isLogged()) {
      this.router.navigate(['/login']);
      return false;
    };

    if (this.tokenService.isEjecutive()) {
      this.realRol = 'EJECUTIVO';
    };

    if (expectedRol.indexOf(this.realRol) < 0) {
      this.router.navigate(['/login']);
      return false;
    };
    return true;
  }
}
