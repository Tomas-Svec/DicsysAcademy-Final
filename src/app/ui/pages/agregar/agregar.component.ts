import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UrlNavigateService } from '../../../data/services/url-navigate.service';
import { GlobalText } from '../../../data/text';
import { Globalurl } from '../../../data/url';
import { CategoriasService } from '../../../data/services/categorias/categorias.service';
import { ProductosService } from '../../../data/services/productos/productos.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent {
  nombre: string = '';
  descripcion: string = '';
  precio: number = 0;
  stock: number = 0;
  idCategoria: any; // Este valor se llenará con la selección del usuario
  arrayCategorias: any[] = []; // Array para almacenar las categorías


  constructor(
    public urlNavigateSerice: UrlNavigateService,
    public globalText: GlobalText,
    public router:Router,
    public serviceProduct: ProductosService
  ){
    const navegabilidad = this.router.getCurrentNavigation();

    if (navegabilidad && navegabilidad.extras && navegabilidad.extras.state) {
      const data = navegabilidad.extras.state;
      this.idCategoria = data['idCategoria'];

      
      
    }
    this.serviceProduct.getProductoById(this.idCategoria).subscribe((result) => {
      this.arrayCategorias  = result;
    });
  }


  
  agregarProducto() {
    if (this.nombre && this.descripcion && this.precio > 0 && this.stock >= 0 && this.idCategoria) {
      const datosProducto = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        stock: this.stock,
        id_categoria: this.idCategoria
      };

      this.serviceProduct.agregarProducto(datosProducto).subscribe(
        (response) => {
          console.log('Producto agregado exitosamente:', response);
          // Opcional: redirigir al usuario a otra página o mostrar un mensaje de éxito
          alert('Producto agregado exitosamente');
          this.router.navigate(['/']); // Redirigir al index
        },
        (error) => {
          console.error('Error al agregar el producto:', error);
          alert('Hubo un error al agregar el producto. Por favor, intente más tarde.');
        }
      );
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }
}