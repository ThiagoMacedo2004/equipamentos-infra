import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackEndPhpService {

  private URL = 'http://localhost/projetos/equipamentos-infra/Comodatos.php';

  constructor(
    private _http: HttpClient
  ) { }

  public listaEquipamentos(obj:any) {
    return this._http.post(this.URL, obj)
  }

  public listaMarcas(obj:any) {
    return this._http.post(this.URL, obj)
  }

  public comodatos(obj:any) {
    return this._http.post(this.URL, obj)
  }

  public getMarcas(obj: any) {
    return this._http.post(this.URL, obj)
  }
}
