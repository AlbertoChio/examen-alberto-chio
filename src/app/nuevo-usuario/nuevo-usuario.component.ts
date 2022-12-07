import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import {
  NuevoUsuarioForm,
  NuevoUsuarioResponse,
  NuevoUsuarioService,
} from './nuevo-usuario.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css'],
})
export class NuevoUsuarioComponent implements OnInit {
  public nuevoUsuarioForm!: FormGroup;
  public datosInvalidos:boolean=false;
  public message:string = ''
  constructor(
    private fb: RxFormBuilder,
    private nuevoUsuarioService: NuevoUsuarioService,
    private router: Router
  ) {
    this.nuevoUsuarioForm = this.fb.formGroup(new NuevoUsuarioForm());
  }

  ngOnInit(): void {}

  public nuevo() {
    this.nuevoUsuarioService
      .nuevoUsuario({ Body: this.nuevoUsuarioForm.value })
      .subscribe((response: NuevoUsuarioResponse) => {
        this.datosInvalidos = !response.IsOK
        this.message = response.Messages
        if (response.IsOK) {
          this.router.navigate(['/home']);
        }
      });
  }
}
