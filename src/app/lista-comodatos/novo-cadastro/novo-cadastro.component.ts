import { DialogColaboradoresComponent } from './../../dialogs/dialog-colaboradores/dialog-colaboradores.component';
import { DialogEquipamentosComponent } from './../../dialogs/dialog-equipamentos/dialog-equipamentos.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BackEndPhpService } from 'src/app/services/back-end-php.service';
import { MatTableDataSource } from '@angular/material/table';
import { DialogSetoresComponent } from 'src/app/dialogs/dialog-setores/dialog-setores.component';

@Component({
  selector: 'app-novo-cadastro',
  templateUrl: './novo-cadastro.component.html',
  styleUrls: ['./novo-cadastro.component.css']
})
export class NovoCadastroComponent implements OnInit {

  displayedColumns: string[] = ['tipo','modelo', 'serial', 'valor', 'disponivel']
  dataSource  = new MatTableDataSource()
  formGroup       : FormGroup

  result:any[] = []
  obj:any = {}
  marcas: any[] = []
  equipamentos:any[] = []
  equipamento: any = {}
  colaborador: any = {}
  formulario: any = {}
  cadastroEqui:boolean = false

  constructor(
    private _services: BackEndPhpService,
    private _fb      : FormBuilder,
    private _router  : Router,
    private _dialog  : MatDialog
  ) { }

  ngOnInit(): void {
    this.getMarcas()
    this.form(),
    this.dados(),
    this.equipamento['']
    console.log(this.equipamentos)
  }

  form() {
    this.formGroup = this._fb.group({
      acao       : ['novoComodato'],
      id_modelo  : this.formulario.id_modelo,
      id_usuario : ['', Validators.required],
      id_setor   : ['', Validators.required],
      obs        : ['', Validators.required]
    })
  }

  salvarComodato() {
    console.log(this.formulario)
    console.log(this.formGroup.value)

    this._services.salvarComodato(JSON.stringify(this.formulario)).subscribe(
      (data:any) => {
        if(data.sucesso) {
          alert('Comodato cadastrado com sucesso!!')
          this._router.navigate(['/listaComodatos'])
        }
      }
    )
  }

  getMarcas() {
    const obj = {
      acao: 'getMarcas'
    }
    this._services.getMarcas(JSON.stringify(obj)).subscribe(
      (data:any) => this.marcas = data
    )
  }


  getEquipamentos(event) {
    this.equipamento.modelo = ''
    this.formulario.id_modelo = ''
    this.removerEquipamento()

    const obj = {
      acao: 'listaEquipamentos',
      id_marca: event.value
    }

    this.marcas.forEach(marca => {
      if(event.value == marca.id) {
        this.obj.marca = marca.marca
      }
    });

    this._services.listaEquipamentos(JSON.stringify(obj)).subscribe(
      (data:any) => {
        this.equipamentos = data
        if(this.equipamentos.length == 0) {
          this.cadastroEqui = true
        } else {
          this.cadastroEqui = false
        }
      }
    )
  }

  selecionarColaborador() {
    this._dialog.open(DialogColaboradoresComponent, {
      width: '50%',
      position: {
        top: '8%'
      }
    }).afterClosed().subscribe(
      (colaborador) => {
        this.colaborador.nome = `${colaborador.matricula} - ${colaborador.nome}`

        this.formulario.id_usuario = colaborador.id
      }
    )
  }

  selecionarSetor() {
    this._dialog.open(DialogSetoresComponent, {
      width: '50%',
      position: {
        top: '8%'
      }
    }).afterClosed().subscribe(
      (setor) => {
        console.log(setor)
        this.formulario.id_setor = setor.id
        this.colaborador.setor = setor.setor
    } )
  }

  selecinarEquipamento() {
    if(this.equipamentos.length == 0) {
      return
    }
    this._dialog.open(DialogEquipamentosComponent, {
      data: {
        equipamentos: this.equipamentos,
        marca: this.obj.marca,
        origem: true
      },
      width: '50%',
      position: {
        top: '8%'
      }
    }).afterClosed().subscribe(
      (equipamento) => {
        this.setData(equipamento)
      }
    )
  }

  setData(data) {
    if(!data) {
      return
    }
    this.formulario.acao = 'salvarComodato'
    this.formulario.id_modelo = data.id
    this.result.push(data)
    console.log(this.result)
    this.dataSource = new MatTableDataSource(this.result)

    this.equipamento = {
      tipo: data.tipo,
      modelo: data.modelo,
      serie: data.serial,
      valor: data.valor
    }
  }

  removerEquipamento() {
    this.formulario = {
      id_modelo: '',
      id_usuario: '',
      id_setor:'',
      obs: ''
    }
    this.result.pop()
    this.dataSource = new MatTableDataSource(this.result)
  }


  dados() {
    this.obj = {
      id_marca: '',
      id_equipamento: '',
      marca:''
    }

    this.equipamento = {
      tipo: '',
      modelo: '',
      serie: '',
      valor: ''
    }

    this.formulario = {
      acao: 'salvarComodato',
      id_modelo: '',
      id_usuario: '',
      id_setor:'',
      obs: ''
    }

    this.colaborador = {
      nome: '',
      matricula: '',
      setor: ''
    }


  }
}
