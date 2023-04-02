import { BackEndPhpService } from 'src/app/services/back-end-php.service';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-historico-equipamento',
  templateUrl: './dialog-historico-equipamento.component.html',
  styleUrls: ['./dialog-historico-equipamento.component.css']
})
export class DialogHistoricoEquipamentoComponent implements OnInit {

  result = []

  constructor(
    private _services: BackEndPhpService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.setData(this.data.data)
  }

  setData(data) {
    this.result = data
    console.log(this.result)
  }



}
