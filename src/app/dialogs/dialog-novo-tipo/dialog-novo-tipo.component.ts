import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BackEndPhpService } from 'src/app/services/back-end-php.service';

@Component({
  selector: 'app-dialog-novo-tipo',
  templateUrl: './dialog-novo-tipo.component.html',
  styleUrls: ['./dialog-novo-tipo.component.css']
})
export class DialogNovoTipoComponent implements OnInit {

  formGroup:FormGroup

  constructor(
    private _services: BackEndPhpService,
    private _dialogRef: MatDialogRef<DialogNovoTipoComponent>,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario()
  }

  formulario() {
    this.formGroup = this._fb.group({
      acao: ['setTipo'],
      tipo: ['', Validators.required]
    })
  }

  setTipo() {
    this._services.setMarca(JSON.stringify(this.formGroup.value)).subscribe(
      (data:any) => {

        if(data.sucesso) {
          this._services.exibirMsg(`Tipo: --"${this.formGroup.get('tipo').value}"-- cadastrado com sucesso!`)
          this._dialogRef.close('ok')
        } else {
          this._services.exibirMsg(data.error)
        }
      }
    )
  }
}
