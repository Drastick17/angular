import { Injectable } from '@angular/core';
import { THistorico } from '../interfaces/thistorico';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThistoricoService {
  private endpoint = "http://localhost:8080/historico"
  constructor(private http:HttpClient) { }

  List():Observable<THistorico[]>{
    return this.http.get<THistorico[]>(this.endpoint)
  }

}
