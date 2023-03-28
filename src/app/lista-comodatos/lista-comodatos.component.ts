import { BackEndPhpService } from './../services/back-end-php.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-comodatos',
  templateUrl: './lista-comodatos.component.html',
  styleUrls: ['./lista-comodatos.component.css']
})
export class ListaComodatosComponent implements OnInit {

  displayedColumns: string[] = [
    'tipo',
    'marca',
    'modelo',
    'serial',
    'nome',
    'matricula',
    'setor',
    'data',
    'observacao',
    'acao'
  ];
  dataSource = new MatTableDataSource();

  result:Comodato[] 

  constructor(
    private _services: BackEndPhpService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  @ViewChild(MatSort) sort: MatSort;

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
  observacao: string
}
