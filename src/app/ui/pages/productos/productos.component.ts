import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { GlobalText } from '../../../data/text';
import { Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductosService } from '../../../data/services/productos/productos.service';
import { NgFor } from '@angular/common';
import { UrlNavigateService } from '../../../data/services/url-navigate.service';
import { catchError, of } from 'rxjs';
import { Globalurl } from '../../../data/url';
import { CommonModule } from '@angular/common';
import { CarritoserviceService } from '../../../data/services/carrito/carritoservice.service';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule,HeaderComponent, FooterComponent, NgFor],
  templateUrl: './productos.component.html',
  styleUrl  : './productos.component.css'
})

export class ProductosComponent{

  listProdByCategoria: any[] = [];
  errorMessage: string = ''; // Variable para el mensaje de error
  idCategoria: any;
  nombreCategoria: any;
  productos: any;

  constructor(
    public globalText: GlobalText,
    public urlNavigateService: UrlNavigateService,
    public globalUrl: Globalurl,
    public router: Router,
    public serviceProduct: ProductosService,
    private carritoService: CarritoserviceService,
  ) {
    const navegabilidad = this.router.getCurrentNavigation();

    if (navegabilidad && navegabilidad.extras && navegabilidad.extras.state) {
      const data = navegabilidad.extras.state;
      this.idCategoria = data['idCategoria'];
      this.nombreCategoria = data['nombreCategoria'];
      
    }

    // Obtener productos por categoría
    this.serviceProduct.getProductoById(this.idCategoria).pipe(
      catchError((error) => {
        this.errorMessage = 'No se pudieron cargar los productos. Por favor, intente más tarde.';
        return of([]); // Retorna un arreglo vacío si ocurre un error
      })
    ).subscribe((result: any[]) => {
      if (result && result.length > 0) {
        this.listProdByCategoria = result;
      } else {
        this.errorMessage = 'No hay productos disponibles en esta categoría.';
      }
    });
  }

  eliminarProducto(idProducto: any): void {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmacion) {
      this.serviceProduct.eliminarProducto(idProducto).subscribe(() => {
        location.reload(); 
      });
    }
  }
  

  navigateModificar(productos: any) {
    this.urlNavigateService.navigateToUrlWithData(this.globalUrl.modificar, {
      state: {
        idCategoria: productos.id_categoria,  // ID de la categoría
        idProducto: productos.id,             // ID del producto seleccionado
        nombreProducto: productos.nombre,
        descripcionProducto: productos.descripcion,
        nombreCategoria: productos.nombre,
        precioProducto: productos.precio,
        stockProducto: productos.stock,
      },
    });
  }

  navigateAgregar() {
    this.urlNavigateService.navigateToUrlWithData(this.globalUrl.agregar, {
      state: {
        idCategoria: this.idCategoria,
      },
      
    });
    console.log(this.idCategoria);
  }

  // Método para agregar un producto al carrito
  agregarAlCarrito(producto: any): void {
    this.carritoService.agregarProductoAlCarrito(producto);  // Usamos el servicio para agregar el producto
    alert(`${producto.nombre} ha sido agregado al carrito.`);
  }

}



 

  /* -CODIGO QUE SI FUNCIONA-
  listProdByCategoria: any;
  public idCategoria; 
  public nombreCategoria: any;
  


  constructor (
    public urlNavigateSerice: UrlNavigateService,
    public globalText: GlobalText,
    public router:Router,
    public serviceProduct: ProductosService
  ){
    const navegabilidad = this.router.getCurrentNavigation();

    if (navegabilidad && navegabilidad.extras && navegabilidad.extras.state){
      const data = navegabilidad.extras.state;
      this.idCategoria = data['idCategoria'];
      this.nombreCategoria = data['nombreCategoria'];
    }

    this.serviceProduct.getProductoById(this.idCategoria).subscribe((result) =>{
      
      
      this.listProdByCategoria=result;
      
      
    })

  }


  eliminarProducto(idProducto: any){
  this.serviceProduct.eliminarProducto(idProducto).subscribe((result)=>{
    location.reload()
  })
}
}
*/