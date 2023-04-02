import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BackEndPhpService } from 'src/app/services/back-end-php.service';

@Component({
  selector: 'app-dialog-colaboradores',
  templateUrl: './dialog-colaboradores.component.html',
  styleUrls: ['./dialog-colaboradores.component.css']
})
export class DialogColaboradoresComponent implements OnInit {

  displayedColumns: string[] = [
    'nome',
    'matricula',
    'acao'
  ];

  dataSource = new MatTableDataSource()

  result:Colaborador[] = []

  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private _services: BackEndPhpService,
    private _dialogRef : MatDialogRef<DialogColaboradoresComponent>,
    private _liveAnnouncer: LiveAnnouncer
  ) { }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }



  ngOnInit(): void {
    this.getColaboradores()
  }

  getColaboradores() {
    const obj = {
      acao: 'getColaboradores'
    }
    this._services.getColaboradores(JSON.stringify(obj)).subscribe(
      (data:Colaborador[]) => this.setData(data)
    )
  }

  setData(data:Colaborador[]) {
    this.result = data
    this.dataSource = new MatTableDataSource(this.result)
  }

  fechar() {
    this._dialogRef.close()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

export interface Colaborador {
  nome:string,
  matricula: string
}
