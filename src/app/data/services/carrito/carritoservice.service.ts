import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoserviceService {
  private carritoKey = 'carrito';  // Almacenar en localStorage

  constructor() { }

  // Obtener productos del carrito desde localStorage
  private obtenerCarritoDelStorage(): any[] {
    const carrito = localStorage.getItem(this.carritoKey);
    return carrito ? JSON.parse(carrito) : [];  // Devuelve un arreglo vacio
  }

  // Guardar productos del carrito en localStorage
  private guardarCarritoEnStorage(carrito: any[]): void {
    localStorage.setItem(this.carritoKey, JSON.stringify(carrito));  // Guarda el carrito en formato JSON
  }

  // Agregar un producto al carrito
  agregarProductoAlCarrito(producto: any): void {
    const carrito = this.obtenerCarritoDelStorage();  // Obtener el carrito actual
    carrito.push(producto);  // Agregar el nuevo producto
    this.guardarCarritoEnStorage(carrito);
  }

  
  obtenerProductosDelCarrito(): any[] {
    return this.obtenerCarritoDelStorage();  // Devuelve los productos almacenados en localStorage
  }

  // Eliminar un producto del carrito
  eliminarProductoDelCarrito(idProducto: any): void {
    let carrito = this.obtenerCarritoDelStorage();  // Obtener el carrito actual
    carrito = carrito.filter(producto => producto.id !== idProducto);  // Filtrar el producto a eliminar
    this.guardarCarritoEnStorage(carrito);  // Guardar el carrito actualizado en localStorage
  }

  // Vaciar el carrito
  vaciarCarrito(): void {
    localStorage.removeItem(this.carritoKey);  // Eliminar el carrito del localStorage
  }
}
