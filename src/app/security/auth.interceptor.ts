import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { LoginService } from './login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginService = this.injector.get(LoginService) // O injector obtem a referencia para o objeto. E o get cria uma instância do mesmo
    if (loginService.isLoggedIn()) {
      const authRequest = req.clone(
        { setHeaders: {'Authorization': `Bearer ${loginService.user.accessToken}`}}
      )
      return next.handle(authRequest)
    }
    return next.handle(req)
  }
}
