import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../interfaces/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private endpoint = "http://localhost:8080/estados"
  constructor(private http:HttpClient) { }
  List():Observable<Estado[]>{
    return this.http.get<Estado[]>(`${this.endpoint}`);
  }
  
  
}
