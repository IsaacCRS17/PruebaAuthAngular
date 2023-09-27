import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//Nombre del token en el localstorage
const TOKEN_KEY = 'AuthTokenSystem';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  constructor(private router: Router) { }

  //Método para guardar el token al iniciar sesión
  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  //Método para obtener el token de la sesión
  public getToken(): any {
    return localStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  //Método para verificar el rol del token
  public isEjecutive():boolean{
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    if (roles.indexOf('ROLE_EJECUTIVO') < 0) {
      return false;
    }
    return true;
  }

  //método para obtener el id de colaborador
  public getIdColaborador():number{
    if (!this.isLogged()) {
      return -1;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const idColaborador = values.idColaborador;

    return idColaborador;
  }
  //Método para cerrar sesión
  public logOut(): void {
    window.localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['/auth']);
  }
}
