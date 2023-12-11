import { DialogDevolucaoEquipamentoComponent } from './../dialogs/dialog-devolucao-equipamento/dialog-devolucao-equipamento.component';
import { DialogDeletarComodatoComponent } from './../dialogs/dialog-deletar-comodato/dialog-deletar-comodato.component';
import { MatDialog } from '@angular/material/dialog';
import { BackEndPhpService } from './../services/back-end-php.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lista-comodatos',
  templateUrl: './lista-comodatos.component.html',
  styleUrls: ['./lista-comodatos.component.css']
})
export class ListaComodatosComponent implements OnInit {

  displayedColumns: string[] = [
    'select',
    'situacao',
    'nome',
    'matricula',
    'setor',
    'tipo',
    'modelo',
    'marca',
    'serial',
    'data',
    'acao'
  ];
  dataSource = new MatTableDataSource<Comodato>()
  selection = new SelectionModel<Comodato>(true, []);


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
        console.log(data)
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

  baixarPDf(item) {
    const obj = {
      acao: 'baixarPDf',
      id  : item.id,
      nome: item.nome
    }

    this._services.baixarPDf(JSON.stringify(obj)).subscribe(
      (data:any) =>{
        console.log(data)
        if(data.error) {
          this._services.exibirMsg(data.error)
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

  gerarExcel() {
    console.log(this.selection.selected)

    const obj = {
      acao: 'excel',
      data: this.selection.selected
    }

    this._services.excel(JSON.stringify(obj)).subscribe(
      (data) => {
        this._services.exibirMsg(data)
      },
      (e:HttpErrorResponse) => {
        this._services.exibirMsg(e.message)
      }
    )

  }

  applyFilter(event: Event) {
    this.selection.clear();
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if(this.dataSource.filteredData.length == 0) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    } else {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.filteredData.length;
      return numSelected === numRows;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.dataSource.filteredData.length  == 0 ? this.selection.select(...this.dataSource.data) : this.selection.select(...this.dataSource.filteredData)

    // this.selection.select(...this.dataSource.data);
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
