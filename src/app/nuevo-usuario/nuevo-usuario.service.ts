import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { email, pattern, prop, required } from '@rxweb/reactive-form-validators';
import { ServiceBody } from '../login/login.component';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class NuevoUsuarioService {

  constructor(private http:HttpClient,private loginService:LoginService) { }

  public nuevoUsuario(body:ServiceBody<NuevoUsuarioForm>){
    const options = {
      headers: new HttpHeaders({
        Authorization:'Bearer '+this.loginService.token
      })
    }
    return this.http.post<NuevoUsuarioResponse>('https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/RegisterUserRole',body,options)
  }

}


export interface Role {
  Id: number;
  Name: string;
}

export class NuevoUsuarioForm {
  @prop()
  Tenant?: any = null;
  @required()
  UserName!: string;
  @required()
  Password!: string;
  @required()
  Name!: string;
  @required()
  FatherLastName!: string;
  @required()
  MotherLastName!: string;
  @required()
  @email()
  Email!: string;
  @required()
  // @pattern({expression:{'telefono': /^[/d]{10}/ }})
  PhoneNumber!: string;
  @prop()
  Metadata?: any = null;
  @prop()
  Roles: Role[] = [ { "Id": 2, "Name": "Usuario Tradicional" } ];
}

export interface NuevoUsuarioResponse {
  TransactionId: string;
  Body: boolean;
  EncryptedBody?: any;
  SecurityData?: any;
  IsOK: boolean;
  Messages?: any;
  ResponseCode: number;
}