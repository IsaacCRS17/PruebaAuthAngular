import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import * as AuthActions from '../actions/auth.actions'; // Importa la acción de inicio de sesión
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private store: Store,
    private router: Router
    ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}


  //Acción de iniciar sesión
  onLogin2() {
    if (this.loginForm.valid) {
      const emailControl = this.loginForm.get('username');
      const passwordControl = this.loginForm.get('password');

      if (emailControl && passwordControl) {
        const email = emailControl.value;
        const password = passwordControl.value;

        //Lógica para llamar el servicio de authenticación y redirigir a la ruta correspondiente
        this.authService.login(email, password).subscribe((data:any)=>{
          if(data.accessToken){
            this.tokenService.setToken(data.accessToken);
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/login']);

          }
        });
      }
    }
  }

  //Acción de iniciar sesión
  onLogin() {
    if (this.loginForm.valid) {
      const usernameControl = this.loginForm.get('username');
      const passwordControl = this.loginForm.get('password');

      if (usernameControl && passwordControl) {
        const username = usernameControl.value;
        const password = passwordControl.value;

        // Despachar la acción de inicio de sesión
        this.store.dispatch(AuthActions.login({ username, password }));
      }
    }
  }
}
