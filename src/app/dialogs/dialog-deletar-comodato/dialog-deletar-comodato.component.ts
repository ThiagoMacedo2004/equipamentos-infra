import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackEndPhpService } from 'src/app/services/back-end-php.service';

@Component({
  selector: 'app-dialog-deletar-comodato',
  templateUrl: './dialog-deletar-comodato.component.html',
  styleUrls: ['./dialog-deletar-comodato.component.css']
})
export class DialogDeletarComodatoComponent implements OnInit {

  // result = []
  result:any

  dataSource = new MatTableDataSource()
  displayedColumns:string[] = [
    'marca',
    'tipo',
    'modelo',
    'serial',
    'nome',
    'matricula',
    'setor',
    'data',
    'observacao'
  ]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _services: BackEndPhpService,
    private _dialogRef : MatDialogRef<DialogDeletarComodatoComponent>,
  ) { }

  ngOnInit(): void {
    // this.setData(this.data.data)
    this.result = this.data.data
  }

  setData(data:any) {
    this.result.push(data)
    console.log(this.result)
    this.dataSource = new MatTableDataSource(this.result)
  }

  deletarComodato() {
    const obj = {
      acao     : 'deletarComodato',
      id       : this.result.id,
      id_modelo: this.result.id_modelo
    }
    this._services.deletarComodato(JSON.stringify(obj)).subscribe(
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

  fechar() {
    this._dialogRef.close()
  }

}
