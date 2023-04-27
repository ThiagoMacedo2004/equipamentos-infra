import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BackEndPhpService } from 'src/app/services/back-end-php.service';

@Component({
  selector: 'app-dialog-usuarios',
  templateUrl: './dialog-usuarios.component.html',
  styleUrls: ['./dialog-usuarios.component.css']
})
export class DialogUsuariosComponent implements OnInit {

  usuario:any
  formGroup: FormGroup

  constructor(
    private _services: BackEndPhpService,
    private _fb      : FormBuilder,
    private _dialog  : MatDialogRef<DialogUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.usuario = this.data.data
    console.log(this.usuario)
    this.formulario()
  }

  formulario() {
    this.formGroup = this._fb.group({
      acao     : [''],
      id       : [''],
      matricula: [this.usuario.matricula, Validators.required],
      nome     : [this.usuario.nome, Validators.required]
    })
  }

  encaminharAcao(acao:string) {
    if(this.data.acao == 'novoColaborador') {
      this.novoColaborador()
    } else {
      this.editarColaborador()
    }
  }

  editarColaborador() {
    this.formGroup.get('acao').reset(this.data.acao)
    this.formGroup.get('id').reset(this.usuario.id)

    console.log(this.formGroup.value)

   this._services.editarColaborador(JSON.stringify(this.formGroup.value)).subscribe(
    (data:any) => {
      if(data.sucesso) {
        this._services.exibirMsg('Informações do colaborador editadas com sucesso !!')
        this._dialog.close('ok')
      }else {
        this._services.exibirMsg(data.error)
      }
    }
   )

  }

  novoColaborador() {
   this.formGroup.get('acao').reset(this.data.acao)


   this._services.novoColaborador(JSON.stringify(this.formGroup.value)).subscribe(
    (data:any) => {
      if(data.sucesso) {
        this._services.exibirMsg('Colaborador cadastrado com sucesso')
        this._dialog.close('ok')
      }else {
        this._services.exibirMsg(data.error)
      }
    }
   )
  }

}
