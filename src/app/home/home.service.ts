import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceBody } from '../login/login.component';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient,
              private loginService:LoginService) { }

  public getUsers(busqueda:ServiceBody<{"SearchText":string}>){
    const options = {
      headers: new HttpHeaders({
        Authorization:'Bearer '+this.loginService.token
      })
    }
    return this.http.post<GetUsersResponse>('https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/GetUsers',busqueda,options)
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

  export interface Body {
      Id: number;
      Username: string;
      Password?: any;
      Name: string;
      FatherLastName: string;
      MotherLastName: string;
      Active: boolean;
      Locked: boolean;
      CreationDate: string;
      Tenant_Id?: number;
      Email: string;
      PhoneNumber: string;
      Metadata: Metadata[];
      Roles: Role[];
  }

  export interface GetUsersResponse {
      TransactionId: string;
      Body: Body[];
      EncryptedBody?: any;
      SecurityData?: any;
      IsOK: boolean;
      Messages?: any;
      ResponseCode: number;
  }