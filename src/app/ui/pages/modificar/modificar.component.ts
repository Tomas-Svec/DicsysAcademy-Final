import { Component } from '@angular/core';
import { UrlNavigateService } from '../../../data/services/url-navigate.service';
import { CommonModule, NgFor } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { GlobalText } from '../../../data/text';
import { Router } from '@angular/router';
import { ProductosService } from '../../../data/services/productos/productos.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-modificar',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent, NgFor],
  templateUrl: './modificar.component.html',
  styleUrl: './modificar.component.css'
})
export class ModificarComponent {

  listProdByCategoria: any;
  nombreCategoria: any;
  idCategoria: any
  nombreProducto: any;
  idProducto: any;
  descripcionProducto: any;
  precioProducto: any;
  stockProducto: any;


  constructor(
    public urlNavigateSerice: UrlNavigateService,
    public globalText: GlobalText,
    public router: Router,
    public serviceProduct: ProductosService
  ) {
    const navegabilidad = this.router.getCurrentNavigation();
    if (navegabilidad && navegabilidad.extras && navegabilidad.extras.state) {
      const data = navegabilidad.extras.state;

      this.idCategoria = data['idCategoria'];
      this.idProducto = data['idProducto'];
      this.nombreProducto = data['nombreProducto'];
      this.descripcionProducto = data['descripcionProducto'];
      this.precioProducto = data['precioProducto'];
      this.stockProducto = data['stockProducto'];
      this.nombreCategoria = data['nombreCategoria'];
    }

    this.serviceProduct.getProductoById(this.idCategoria).subscribe((result) => {
      this.listProdByCategoria = result;
    });

  }



  editarProducto(idCategoria: any): void {
    console.log('Producto enviado para modificar:', idCategoria); // Verificando el objeto
    const datosProducto = {
      nombre: idCategoria.nombre,
      descripcion: idCategoria.descripcion,
      precio: idCategoria.precio,
      stock: idCategoria.stock,
    };

    // Llamada al servicio para modificar el producto
    this.serviceProduct.modificarProducto(idCategoria.id, datosProducto).subscribe(
      () => {
        setTimeout(() => {
          this.router.navigate(['/productos'], {
            state: {
              idCategoria: this.idCategoria,
              nombreCategoria: this.nombreCategoria,

            },

          });
          console.log('Nombre de la categoría enviado:', this.nombreProducto);
        }, 200); // Retraso para animación
      },
      (error) => {
        console.error('Error al modificar el producto:', error);
      }
    );
  }


}
