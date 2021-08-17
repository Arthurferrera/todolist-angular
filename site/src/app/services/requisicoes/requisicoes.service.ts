import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequisicoesService {
  private ambiente: string = API_URL;

  constructor(private _http: HttpClient) {}

  /**
   * POST
   * metodo_api recebe função a ser chamada na API
   * dados recebe uma string
   */
  public post(metodo_api: string, dados: any) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      Accept: 'application/json',
      'content-type': 'application/json',
    });

    return this._http.post(
      this.ambiente + '/' + metodo_api,
      JSON.stringify(dados)
    );
  }

  public put(metodo_api: string, dados: any) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'access-control-request-method': 'PUT',
      'Access-Control-Allow-Methods': 'POST, GET,PUT, OPTIONS',
      'access-control-request-headers': '',
    }).set('Content-Type', 'application/json');

    return this._http.put(
      this.ambiente + '/' + metodo_api,
      JSON.stringify(dados)
    );
  }

  /**
   * GET
   * metodo_api recebe função a ser chamada na API
   * filtro valor que será filtrado na API
   */
  public get(metodo_api: string, dados = {}) {
    return this._http.get(this.ambiente + '/' + metodo_api + '/', {
      params: dados,
    });
  }

  /**
   * DELETE
   * metodo_api recebe função a ser chamada na API
   * filtro valor que será filtrado na API
   */
  public delete(metodo_api: string, dados = {}) {
    return this._http.delete(this.ambiente + '/' + metodo_api + '/', {
      params: dados,
    });
  }

  /**
   * GET com promise
   * metodo_api recebe função a ser chamada na API
   * filtro valor que será filtrado na API
   */
  public async getPromise(metodo_api: string, dados = {}) {
    return this._http
      .get(this.ambiente + '/' + metodo_api + '/', {
        params: dados,
      })
      .toPromise()
      .then((resposta) => {
        return resposta;
      })
      .catch((erro) => {
        console.log(erro);
      });
  }
}
