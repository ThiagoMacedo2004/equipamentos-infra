import { Component, OnInit } from '@angular/core';
import { BackEndPhpService } from 'src/app/services/back-end-php.service';

@Component({
  selector: 'app-novo-cadastro',
  templateUrl: './novo-cadastro.component.html',
  styleUrls: ['./novo-cadastro.component.css']
})
export class NovoCadastroComponent implements OnInit {

  dados:any = {}
  marcas: any[] = []

  constructor(
    private _services: BackEndPhpService
  ) { }

  ngOnInit(): void {
    this.getMarcas()
  }

  // changeMarca(evento:any) {
  //   if(evento.value) {
  //     this.getMarcar()
  //   }
  // }

  getMarcas() {
    const obj = {
      acao: 'getMarcas'
    }
    this._services.getMarcas(JSON.stringify(obj)).subscribe(
      (data:any) => this.marcas = data
    )
  }

}
