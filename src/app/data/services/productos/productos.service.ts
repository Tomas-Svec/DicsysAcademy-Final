import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ProductosService {
    private apiUrl = 'http://127.0.0.1:3307/api'; // Base de la URL de la API

  constructor(private http: HttpClient) {}
/*
  public getProductoById(id: string){
    return this.http.get(`http://127.0.0.1:3307/api/productos/${id}`);
  }
*/

getProductoById(idCategoria: any): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/productos/${idCategoria}`);
}

  public eliminarProducto(id: string){
    return this.http.delete(`http://127.0.0.1:3307/api/productos/${id}`);
  }


  public modificarProducto(id: string, datosProducto: { nombre: string, descripcion: string, precio: number, stock: number }): Observable<any> {
    return this.http.put(`http://127.0.0.1:3307/api/productos/${id}`, datosProducto);
  }

  public agregarProducto(datosProducto: { nombre: string, descripcion: string, precio: number, stock: number, id_categoria: string }): Observable<any> {
    return this.http.post('http://127.0.0.1:3307/api/productos', datosProducto);
  }
  


  
  


}