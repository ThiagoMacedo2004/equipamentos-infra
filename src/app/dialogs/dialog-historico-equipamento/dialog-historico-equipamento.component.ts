import { BackEndPhpService } from 'src/app/services/back-end-php.service';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-historico-equipamento',
  templateUrl: './dialog-historico-equipamento.component.html',
  styleUrls: ['./dialog-historico-equipamento.component.css']
})
export class DialogHistoricoEquipamentoComponent implements OnInit {

  result = []

  constructor(
    private _dialogRef: MatDialogRef<DialogHistoricoEquipamentoComponent>,
    private _services: BackEndPhpService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this._dialogRef.disableClose = true
    this.setData(this.data.data)
  }

  setData(data) {
    this.result = data

    if(this.result.length === 0) {
      this._dialogRef.updateSize('30%')
    }
  }



}
