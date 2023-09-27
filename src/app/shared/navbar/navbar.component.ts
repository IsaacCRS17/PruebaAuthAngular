import { Component, signal, OnInit } from '@angular/core';
import { TokenService } from 'src/app/auth/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  idColaborador = signal(0);
  role = signal("Ejecutivo");
  constructor(private tokenService: TokenService){}
  ngOnInit(): void {
    this.idColaborador = signal(this.tokenService.getIdColaborador());

  }


  //acción de cerrar sesión
  onLogOut(): void {
    this.tokenService.logOut();
  }
}
