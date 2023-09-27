import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, catchError, concatMap, throwError } from 'rxjs';
import { TokenService } from '../auth/services/token.service';

const AUTHORIZATION = 'Authorization';

@Injectable()
export class InterceptorAuthService implements HttpInterceptor {

  constructor(
    private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.tokenService.isLogged()) {
      return next.handle(request);
    }

    let intReq = request;
    const token = this.tokenService.getToken();

    intReq = this.addToken(request, token);

    return next.handle(intReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.tokenService.logOut();
        }
        return throwError(() => err);
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set(AUTHORIZATION, 'Bearer ' + token),
    });
  }
}

export const authInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorAuthService,
    multi: true,
  },
];
