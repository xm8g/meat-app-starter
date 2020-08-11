import { MEAT_API } from './../../app.api';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

  user: User
  lastUrl: string

  constructor(private http: HttpClient, private router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => this.lastUrl = e.url)

    /** Angular 7+
    this.router.events.pipe(
        filter( e => e instanceof NavigationEnd ))
        .subscribe( (e: NavigationEnd) => this.lastUrl = e.url)
    */
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${MEAT_API}/login`, {
      email: email,
      password: password
    }).pipe(
      tap(user => this.user = user)
    )
  }

  isLoggedIn(): boolean {
    return this.user !== undefined
  }

  handleLogin(path: string = this.lastUrl) {
    this.router.navigate(['/login', path]) // encoda a URL em base64
  }

  logout() {
    this.user = undefined
    this.router.navigate(['/'])
  }
}
