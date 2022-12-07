import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm, ServiceBody } from './login.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    public token = ''
  constructor(private http:HttpClient) { }

  public validarlogin(body:ServiceBody<LoginForm>){
    return this.http.post<ServiceResponse>('https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/authentication/authentication',body)
  }

}




  export interface Metadata {
      Name: string;
      GroupName: string;
      Value: string;
  }

  export interface Role {
      Id: number;
      Name: string;
  }

  export interface Function {
      Id: number;
      Name: string;
  }

  export interface Module {
      Id: number;
      Name: string;
      Functions: Function[];
  }

  export interface Application {
      Id: number;
      Name: string;
      Modules: Module[];
  }

  export interface SecurityLoginData {
      Roles: Role[];
      Applications: Application[];
  }

  export interface UserLoginData {
      Id: number;
      Username: string;
      Name: string;
      FatherLastName: string;
      MotherLastName: string;
      Email: string;
      PhoneNumber: string;
      Metadata: Metadata[];
      SecurityLoginData: SecurityLoginData;
      CurrentFileId: number;
  }

  export interface Body {
      UserLoginData: UserLoginData;
      JWTExpireTimeOfflineMinutes: number;
      Token: string;
  }

  export interface ServiceResponse {
      TransactionId: string;
      Body: Body;
      EncryptedBody?: any;
      SecurityData?: any;
      IsOK: boolean;
      Messages?: any;
      ResponseCode: number;
  }
