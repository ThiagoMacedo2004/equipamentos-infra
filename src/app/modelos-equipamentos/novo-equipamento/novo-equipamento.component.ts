import { DialogNovoTipoComponent } from './../../dialogs/dialog-novo-tipo/dialog-novo-tipo.component';
import { DialogNovaMarcaComponent } from './../../dialogs/dialog-nova-marca/dialog-nova-marca.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BackEndPhpService } from 'src/app/services/back-end-php.service';

@Component({
  selector: 'app-novo-equipamento',
  templateUrl: './novo-equipamento.component.html',
  styleUrls: ['./novo-equipamento.component.css']
})
export class NovoEquipamentoComponent implements OnInit {

  formGroup: FormGroup

  result: any[] = []
  marcas: any[] = []
  tipos : any[] = []
  value : string
  constructor(
    private _services: BackEndPhpService,
    private _fb      : FormBuilder,
    private _router  : Router,
    private _dialog  : MatDialog
  ) { }

  ngOnInit(): void {
    this.getMarcas()
    this.getTipos()
    this.form()
  }

  form() {
    this.formGroup = this._fb.group({
      acao      : ['novoEquipamento'],
      id_tipo   : ['', Validators.required],
      id_marca  : ['', Validators.required],
      modelo    : ['', Validators.required],
      serial    : ['', Validators.required],
      valor     : [this.value, Validators.required]
    })
  }

  getMarcas() {
    const obj = {
      acao: 'getMarcas'
    }
    this._services.getMarcas(JSON.stringify(obj)).subscribe(
      (data:any) => this.marcas = data
    )
  }

  setMarca() {
    this._dialog.open(DialogNovaMarcaComponent, {
      width:'20%',
      position: {
        top: '8%'
      }
    }).afterClosed().subscribe(
      (data) => {
        if(data) {
          this.getMarcas()
        }
      }

    )
  }

  setTipo() {
    this._dialog.open(DialogNovoTipoComponent, {
      width:'20%',
      position: {
        top: '8%'
      }
    }).afterClosed().subscribe(
      (data) => {
        if(data) {
          this.getTipos()
        }
      }
    )
  }

  getTipos() {
    const obj = {
      acao: 'getTipos'
    }
    this._services.getTipos(JSON.stringify(obj)).subscribe(
      (data:any) => this.tipos = data
    )
  }



  novoEquipamento() {
    this._services.novoEquipamento(JSON.stringify(this.formGroup.value)).subscribe(
      (data:any) => {
        if(data.sucesso) {
          this.getMarcas()
          this._services.exibirMsg(`Equipamento cadastrado com sucesso!!`)
        } else {
          this._services.exibirMsg(data)
        }
      }
    )
  }

  mascaraMoeda() {
    if(this.value == '0' || this.value == '') {
      return
    }

    var x = this.value.replace('.', '')
    var y = parseFloat(x) / 100
    x = y.toFixed(2).toString()
    this.value = x
    return this.value
  }

}
