import { HttpClient, HttpParams } from "@angular/common/http";
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
}