import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackEndPhpService } from 'src/app/services/back-end-php.service';

@Component({
  selector: 'app-dialog-devolucao-equipamento',
  templateUrl: './dialog-devolucao-equipamento.component.html',
  styleUrls: ['./dialog-devolucao-equipamento.component.css']
})
export class DialogDevolucaoEquipamentoComponent implements OnInit {

  result:any

  comodato:any = {}

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _services: BackEndPhpService,
    private _dialogRef : MatDialogRef<DialogDevolucaoEquipamentoComponent>,
  ) { }


  ngOnInit(): void {
    this.result = this.data.data
    this.comodato.data = ''
    this.comodato.obs = this.result.observacao
  }

  devolucao() {
    const obj = {
      acao     : 'devolucaoEquipamento',
      id       : this.result.id,
      id_modelo: this.result.id_modelo,
      data     : this.getData(),
      obs      : this.comodato.obs
    }
    console.log(obj)
    this._services.devolucaoEquipamento(JSON.stringify(obj)).subscribe(
      (data:any) => {
        if(data.sucesso) {
          this._services.exibirMsg(data.sucesso)
          this._dialogRef.close('ok')
        } else {
          this._services.exibirMsg(data.error)
        }
      }
    )
  }

  getData() {
    let data = new Date(this.comodato.data)

    let ano: any = data.getFullYear()
    let mes: any = (data.getMonth()) + 1
    let dia: any = data.getDate()

    if(mes <= 9) {
      mes = `0${mes}`
    }

    if(dia <= 9) {
      dia = `0${dia}`
    }

    return `${ano}-${mes}-${dia}`
  }

}
