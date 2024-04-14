import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(
        private _httpClient: HttpClient
    ) {}

    getAll(cantidad: number, pagina: number, textoBusqueda: string){
        let parametros = new HttpParams();

        parametros = parametros.append('cantidad', cantidad)
        parametros = parametros.append('pagina', pagina)
        parametros = parametros.append('textoBusqueda', textoBusqueda)

        return this._httpClient.get('http://localhost:57477/api/mecanico', { params: parametros })
    }

    delete(ids: number[]){
        const option = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: ids
        }
        return this._httpClient.delete('http://localhost:57477/api/mecanico', option)
    }
}