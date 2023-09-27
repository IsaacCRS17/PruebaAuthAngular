import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthserviceService,
    private tokenService: TokenService,
    private router: Router
    ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}


  //Acción de iniciar sesión
  onLogin() {
    if (this.loginForm.valid) {
      const emailControl = this.loginForm.get('email');
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
}
