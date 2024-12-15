import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoriasService {
  private apiUrl = 'http://127.0.0.1:3307/api/categorias/';

  constructor(public http:HttpClient) { }
/*
  public getCategorias(){
    return this.http.get('http://127.0.0.1:3307/api/categorias/');
  }
*/

getCategorias(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}

createCategoria(categoria: { nombre: string }): Observable<any> {
  return this.http.post<any>(this.apiUrl, categoria);
}

deleteCategoria(idCategoria: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/${idCategoria}`);
}

}
