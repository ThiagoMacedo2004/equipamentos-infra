import { BackEndPhpService } from 'src/app/services/back-end-php.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { DialogEquipamentosComponent } from '../dialogs/dialog-equipamentos/dialog-equipamentos.component';

@Component({
  selector: 'app-modelos-equipamentos',
  templateUrl: './modelos-equipamentos.component.html',
  styleUrls: ['./modelos-equipamentos.component.css']
})
export class ModelosEquipamentosComponent implements OnInit {

  displayedColumns:string[] = [
    'marca',
    'tipo',
    'modelo',
    'qtd',
    'disponivel',
    'acao'
  ]

  dataSource = new MatTableDataSource()
  result:any[] = []

  equipamentos:any[] = []
  marca:string


  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _service:BackEndPhpService,
    private _liveAnnouncer: LiveAnnouncer,
    private _dialog  : MatDialog
  ) { }

  ngOnInit(): void {
    this.listaEquipamentos()
  }

  listaEquipamentos() {
    const obj = {
      acao: 'listaEquipamentos'
    }
    this._service.listaEquipamentos(JSON.stringify(obj)).subscribe(
      (data) => this.setData(data)
    )
  }

  setData(data) {
    console.log(data)
    this.result = data
    this.dataSource = new MatTableDataSource(this.result)
    this.dataSource.sort = this.sort
  }

  getEquipamentos(data) {
    this.marca = data.marca
    const obj = {
      acao: 'listaEquipamentos',
      id_marca: data.id_marca,
      modelo: data.modelo
    }

    this._service.listaEquipamentos(JSON.stringify(obj)).subscribe(
      (data:any) => {
        this.equipamentos = data
        this.selecinarEquipamento()
      }
    )
  }

  selecinarEquipamento() {
    if(this.equipamentos.length == 0) {
      return
    }
    this._dialog.open(DialogEquipamentosComponent, {
      data: {
        equipamentos: this.equipamentos,
        marca       : this.marca,
        origem      : false
      },
      width: '50%',
      position: {
        top: '8%'
      }
    })
  }

  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
