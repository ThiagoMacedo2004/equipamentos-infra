import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BackEndPhpService } from '../services/back-end-php.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogUsuariosComponent } from '../dialogs/dialog-usuarios/dialog-usuarios.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = [
    'matricula',
    'nome',
    'acao'
  ];
  dataSource = new MatTableDataSource()

  result:any[]

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
    this.getColaboradores()
  }

  getColaboradores() {
    const obj = {
      acao: 'getColaboradores'
    }
    this._services.getColaboradores(JSON.stringify(obj)).subscribe(
      (data) => this.setData(data)
    )
  }

  setData(data) {
    console.log(data)
    this.result = data
    this.dataSource = new MatTableDataSource(this.result)
    this.dataSource.sort = this.sort;
  }


  dialogUsuario(titulo: string, acao:string, data) {
    this._dialog.open(DialogUsuariosComponent, {
      data: {
        data: data,
        titulo: titulo,
        acao: acao
      },
      position: {
        top: '8%'
      },
      width: '25%'
    }).afterClosed().subscribe(
      (data) => {
        if(data) {
          this.getColaboradores()
        }
      }
    )
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
