import { BackEndPhpService } from 'src/app/services/back-end-php.service';
import { DialogHistoricoEquipamentoComponent } from './../dialog-historico-equipamento/dialog-historico-equipamento.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog-equipamentos',
  templateUrl: './dialog-equipamentos.component.html',
  styleUrls: ['./dialog-equipamentos.component.css']
})
export class DialogEquipamentosComponent implements OnInit {

  displayedColumns: string[] = ['tipo','modelo', 'serial', 'valor', 'disponivel', 'acao']
  dataSource  = new MatTableDataSource()
  marca:string = ''
  origem:boolean = true

  constructor(
    private _dialogRef: MatDialogRef<DialogEquipamentosComponent>,
    private _dialog   : MatDialog,
    private _services : BackEndPhpService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.setData()
  }

  setData() {
    this.dataSource = new MatTableDataSource(this.data.equipamentos)
    this.marca      = this.data.marca
    if(!this.data.origem || this.data.origem == '') {
      this.origem = true
    } else {
      this.origem = this.data.origem
    }
  }

  getHistorico(item) {
    const obj = {
      acao     : 'historicoEquipamento',
      id_modelo: item.id
    }
    this._services.historicoEquipamento(JSON.stringify(obj)).subscribe(
      (data) => {
        this.openDialogHisttorico(data)
      }
    )
  }

  openDialogHisttorico(data){
    this._dialog.open(DialogHistoricoEquipamentoComponent, {
      data: {
        data: data
      },
      width: '80%',
      position: {
        top: '8%'
      }
    })
  }

  fechar() {
    this._dialogRef.close();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
