import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BackEndPhpService } from 'src/app/services/back-end-php.service';


@Component({
  selector: 'app-dialog-setores',
  templateUrl: './dialog-setores.component.html',
  styleUrls: ['./dialog-setores.component.css']
})
export class DialogSetoresComponent implements OnInit {

  displayedColumns: string[] = [
    'setor',
    'acao'
  ];

  dataSource = new MatTableDataSource()

  result:Setor[] = []

  constructor(
    private _services: BackEndPhpService,
    private _dialogRef : MatDialogRef<DialogSetoresComponent>,
  ) { }

  ngOnInit(): void {
    this.getSetores()
  }

  getSetores() {
    const obj = {
      acao: 'getSetores'
    }
    this._services.getSetores(JSON.stringify(obj)).subscribe(
      (data:Setor) => this.setData(data)
    )
  }

  setData(data) {
    console.log(data)
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

export interface Setor {
  setor: string
}
