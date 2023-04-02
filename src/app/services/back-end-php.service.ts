import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class BackEndPhpService {

  private URL = 'http://localhost/projetos/equipamentos-infra/Comodatos.php';

  confgMsg: MatSnackBarConfig = {
    horizontalPosition : 'start',
    verticalPosition   : 'bottom',
    duration          : 5000
  }

  constructor(
    private _http: HttpClient,
    private msg : MatSnackBar
  ) { }

  public exibirMsg(msg:any) {
    this.msg.open(msg, 'X', this.confgMsg)
  }

  public listaEquipamentos(obj:any) {
    return this._http.post(this.URL, obj)
  }

  public getMarcas(obj:any) {
    return this._http.post(this.URL, obj)
  }

  public setMarca(obj:any) {
    return this._http.post(this.URL, obj)
  }

  public listaTipos(obj:any) {
    return this._http.post(this.URL, obj)
  }

  public comodatos(obj:any) {
    return this._http.post(this.URL, obj)
  }

  public getColaboradores(obj:any) {
    return this._http.post(this.URL, obj)
  }

  public getSetores(obj:any) {
    return this._http.post(this.URL, obj)
  }

  public salvarComodato(obj:any) {
    return this._http.post(this.URL, obj)
  }

  public getTipos(obj:any) {
    return this._http.post(this.URL, obj)
  }

  public novoEquipamento(obj:any) {
    return this._http.post(this.URL, obj)
  }

  public setTipo(obj:any) {
    return this._http.post(this.URL, obj)
  }

  public deletarComodato(obj:any) {
    return this._http.post(this.URL, obj)
  }

  public devolucaoEquipamento(obj:any) {
    return this._http.post(this.URL, obj)
  }

}
