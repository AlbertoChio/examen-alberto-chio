import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { required, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { GetUsersResponse, HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listaUsuarios:Usuario[] = [];
  busquedaForm!:FormGroup

  constructor(private homeService:HomeService,
    private fb:RxFormBuilder,) { 
    this.busquedaForm = fb.formGroup(new BusquedaForm())
  }

  ngOnInit(): void {
    
  }

  public busquedaUsuarios(){
    this.homeService.getUsers({Body:this.busquedaForm.value}).subscribe(
      (response:GetUsersResponse)=>{
        if(response.IsOK){
          this.listaUsuarios = response.Body
        }else{
          this.listaUsuarios = []
        }
        
      }
    )
  }

}

class Usuario{
  Id?:number
  Name?:string
  FatherLastName?:string
  MotherLastName?:string
}

class BusquedaForm{
  @required()
  SearchText!:string
}
