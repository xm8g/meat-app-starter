import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { NotificationService } from '../../shared/messages/notification.services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  navigateTo: string // contém o caminho a seguir depois de logar 

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required])
    })
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || '/'
    console.log('Parametro capturado =>', this.navigateTo)
  }

  login() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        // 1ª CallBack
        user => this.notificationService.notify(`Bem vindo ${user.name}`), // 1ª CallBack
        // 2ª CallBack (quando teve erro, o response é do tipo HttpErrorResponse)
        response => this.notificationService.notify(response.error.message),
        // 3ª CallBack (Tela a ser navegada após o login)
        () => { this.router.navigate([this.navigateTo])} // decodifica a URL que estava em base 64
    )
  }

}
