import { Component, OnInit } from '@angular/core';
import { CarritoserviceService } from '../../../data/services/carrito/carritoservice.service';
import { Router } from '@angular/router';
import { UrlNavigateService } from '../../../data/services/url-navigate.service';
import { GlobalText } from '../../../data/text';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-carrito-component',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './carrito-component.component.html',
  styleUrl: './carrito-component.component.css'
})
export class CarritoComponentComponent implements OnInit {
  productosEnCarrito: any[] = [];

  constructor(
    private carritoService: CarritoserviceService,
    public urlNavigateSerice: UrlNavigateService,
    public globalText: GlobalText,
    public router: Router,
  ) {
    // Cargar los productos desde localStorage al cargar el componente
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.productosEnCarrito = JSON.parse(carritoGuardado);
    }
  }

  ngOnInit(): void {
    this.productosEnCarrito = this.carritoService.obtenerProductosDelCarrito(); //Lee los productos del carrito al iniciar
  }

  //Eliminar producto del carrito
  eliminarProductoDelCarrito(id: number) {
    this.productosEnCarrito = this.productosEnCarrito.filter(producto => producto.id !== id);
    this.actualizarCarrito();
  }

  //Vaciar el carrito
  vaciarCarrito() {
    this.productosEnCarrito = [];
    this.actualizarCarrito();
  }

  // Calcular el total del carrito
  obtenerTotal(): number {
    return this.productosEnCarrito.reduce((total, producto) => total + parseFloat(producto.precio.toString()), 0);
  }

  //Guardar el carrito en localStorage
  private actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.productosEnCarrito));
  }
}
