import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

  constructor(
    private loginService: LoginService
  ) { }

  checkAuthentication(path: string): boolean {
    const loggedIn = this.loginService.isLoggedIn()
    console.log('checkAuthentication =>', loggedIn, `/${path}`)
    if (!loggedIn) {
      this.loginService.handleLogin(`/${path}`)
    }

    return loggedIn
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkAuthentication(route.path)
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkAuthentication(route.routeConfig.path)
  }
}
