import { BackEndPhpService } from 'src/app/services/back-end-php.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-nova-marca',
  templateUrl: './dialog-nova-marca.component.html',
  styleUrls: ['./dialog-nova-marca.component.css']
})
export class DialogNovaMarcaComponent implements OnInit {

  formGroup:FormGroup

  constructor(
    private _services: BackEndPhpService,
    private _dialogRef: MatDialogRef<DialogNovaMarcaComponent>,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario()
  }

  formulario() {
    this.formGroup = this._fb.group({
      acao: ['setMarca'],
      marca: ['', Validators.required]
    })
  }

  setMarca() {
    this._services.setMarca(JSON.stringify(this.formGroup.value)).subscribe(
      (data:any) => {

        if(data.sucesso) {
          this._services.exibirMsg(`Marca: --"${this.formGroup.get('marca').value}"-- cadastrada com sucesso!`)
          this._dialogRef.close('ok')
        } else {
          this._services.exibirMsg(data)
        }
      }
    )
  }

}
