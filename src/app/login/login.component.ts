import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { required } from '@rxweb/reactive-form-validators';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { LoginService, ServiceResponse } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  loginInvalido:boolean = false;

  constructor(
    private fb:RxFormBuilder,
    private loginService:LoginService,
    private router:Router
    ) {
    this.loginForm = this.fb.formGroup(new LoginForm())
   }

  ngOnInit(): void {
  }

  public onSubmit(){
    this.loginService.validarlogin({Body:this.loginForm.value}).subscribe(
      (response:ServiceResponse)=>{
        this.loginInvalido=!response.IsOK
        if(response.IsOK){
          this.loginService.token = response.Body.Token
          this.router.navigate(['/home'])
      }
    }
    )
  }

}

export class LoginForm{
  @required()
  Username!:string
  @required()
  Password!:string
}

export interface ServiceBody<T>{
  Body:T
}