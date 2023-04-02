import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Setor } from '../dialogs/dialog-setores/dialog-setores.component';
import { BackEndPhpService } from '../services/back-end-php.service';

@Component({
  selector: 'app-setores',
  templateUrl: './setores.component.html',
  styleUrls: ['./setores.component.css']
})
export class SetoresComponent implements OnInit {

  displayedColumns: string[] = [
    'setor',
    'acao'
  ];

  dataSource = new MatTableDataSource()

  result:Setor[] = []
  private _liveAnnouncer: any;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _services: BackEndPhpService,

  ) { }

  ngOnInit(): void {
    this.getSetores()
  }

  getSetores() {
    const obj = {
      acao: 'getSetores'
    }
    this._services.getSetores(JSON.stringify(obj)).subscribe(
      (data) => this.setData(data)
    )
  }

  setData(data) {
    this.result = data
    this.dataSource = new MatTableDataSource(this.result)
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


}
