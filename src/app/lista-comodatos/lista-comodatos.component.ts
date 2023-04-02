import { DialogDevolucaoEquipamentoComponent } from './../dialogs/dialog-devolucao-equipamento/dialog-devolucao-equipamento.component';
import { DialogDeletarComodatoComponent } from './../dialogs/dialog-deletar-comodato/dialog-deletar-comodato.component';
import { MatDialog } from '@angular/material/dialog';
import { BackEndPhpService } from './../services/back-end-php.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-comodatos',
  templateUrl: './lista-comodatos.component.html',
  styleUrls: ['./lista-comodatos.component.css']
})
export class ListaComodatosComponent implements OnInit {

  displayedColumns: string[] = [
    'situacao',
    'marca',
    'tipo',
    'modelo',
    'serial',
    'nome',
    'matricula',
    'setor',
    'data',
    'acao'
  ];
  dataSource = new MatTableDataSource()

  result:Comodato[]

  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private _services: BackEndPhpService,
    private _liveAnnouncer: LiveAnnouncer,
    private _dialog: MatDialog
  ) { }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.comodatos()
  }

  comodatos() {
    const obj = {
      acao: 'comodatos'
    }
    this._services.comodatos(JSON.stringify(obj)).subscribe(
      (data:Comodato[]) => {
        this.setData(data)
      }
    )
  }

  setData(data:Comodato[]) {
    this.result = data
    this.dataSource = new MatTableDataSource(this.result)
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  deletar(item) {
    this._dialog.open(DialogDeletarComodatoComponent, {
      data: {
        data: item
      },
      width:'60%',
      position: {
        top:'8%'
      }
    }).afterClosed().subscribe(
      (data) => {
        if(data) {
          this.comodatos()
        }
      }
    )
  }

  devolucaoEquipamento(item) {
    this._dialog.open(DialogDevolucaoEquipamentoComponent, {
      data: {
        data: item
      },
      width:'60%',
      position: {
        top:'8%'
      }
    }).afterClosed().subscribe(
      (data) => {
        if(data) {
          this.comodatos()
        }
      }
    )
  }

}

export interface Comodato {
  tipo: string,
  marca: string,
  modelo: string,
  seria: string,
  nome: string,
  matricula:string,
  setor: string,
  data: string,
  observacao: string,
  situacao: string
}
