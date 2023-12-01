import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';
import { Move } from '../interfaces/move';
import { ProductoStock } from '../interfaces/productoStock';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private endpoint = "http://localhost:8080/productos"
  constructor(private http:HttpClient) { }

  List():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.endpoint)
  }
  ListStock():Observable<ProductoStock[]>{
    return this.http.get<ProductoStock[]>(`${this.endpoint}/stock`)
  }


  Update( est_Id:number, model:Producto):Observable<Producto>{
    return this.http.put<Producto>(`${this.endpoint}/${est_Id}`, model)
  }

  Create( model:Producto):Observable<Producto>{
    return this.http.post<Producto>(this.endpoint, model)
  }
  
  Delete( est_Id:number):Observable<void>{
    return this.http.delete<void>(`${this.endpoint}/${est_Id}`)
  }
  
  Buy(objComprar:Move):Observable<any>{
    return this.http.put(`${this.endpoint}/comprar`,objComprar, {responseType:'text'});
  }

  Sell(objVender:Move):Observable<any>{
    return this.http.post(`${this.endpoint}/vender`,objVender, {responseType:'text'});
  }

  Back(sellId:number):Observable<any>{
    return this.http.post<any>(`${this.endpoint}/anular/${sellId}`, {responseType:'text'});
  }


}
