import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog-equipamentos',
  templateUrl: './dialog-equipamentos.component.html',
  styleUrls: ['./dialog-equipamentos.component.css']
})
export class DialogEquipamentosComponent implements OnInit {

  displayedColumns: string[] = ['tipo','modelo', 'serial', 'valor', 'disponivel', 'acao']
  dataSource  = new MatTableDataSource()
  marca:string = ''
  origem:boolean = true

  constructor(
    private dialogRef : MatDialogRef<DialogEquipamentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.setData()
  }

  setData() {
    this.dataSource = new MatTableDataSource(this.data.equipamentos)
    this.marca      = this.data.marca
    if(!this.data.origem || this.data.origem == '') {
      this.origem = true
    } else {
      this.origem = this.data.origem
    }
  }

  fechar() {
    this.dialogRef.close();

  }

}
