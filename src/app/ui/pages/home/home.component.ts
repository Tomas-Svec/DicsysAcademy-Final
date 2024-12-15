
import { UrlNavigateService } from '../../../data/services/url-navigate.service';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SliderComponent } from "../../components/slider/slider.component";
import { Globalurl } from '../../../data/url';
import { GlobalText } from '../../../data/text';
import { FooterComponent } from "../../components/footer/footer.component";
import { NgFor } from '@angular/common';
import { CategoriasService } from '../../../data/services/categorias/categorias.service';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SliderComponent, FooterComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  arrayCategorias: any[] = []; // Especifica que es un arreglo
  errorMessage: string = '';
  idCategoria: any;
  descripcion: any;

  constructor(
    public urlNavigateSerice: UrlNavigateService,
    public globalText: GlobalText,
    public globalurl: Globalurl,
    public categoriasService: CategoriasService,
    public urlNavigateService: UrlNavigateService,
    public globalUrl: Globalurl
  ) {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriasService.getCategorias().pipe(
      catchError((error) => {
        this.errorMessage = 'No hay categorías disponibles o la base de datos no está disponible.';
        return of([]);
      })
    ).subscribe((result: any[]) => {
      if (result.length > 0) {
        this.arrayCategorias = result;
        this.errorMessage = '';
      } else {
        this.errorMessage = 'No hay categorías disponibles.';
      }
    });
  }

  navigateToProducts(categorias: any) {
    this.urlNavigateSerice.navigateToUrlWithData(this.globalurl.products, {
      state: {
        idCategoria: categorias.id, //saco de la query
        nombreCategoria: categorias.nombre
      },
    });
  }

  navigateAgregarProducto() {
    this.urlNavigateSerice.navigateToUrlWithData(this.globalurl.categorias, {
      state: {},
    });
  }

  eliminarCategoria(idCategoria: number): void {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.categoriasService.deleteCategoria(idCategoria).subscribe(
        () => {
          alert('Categoría eliminada con éxito.');
          this.cargarCategorias();
        },
        (error) => {
          console.error('Error al eliminar la categoría:', error);
          alert('Ocurrió un error al eliminar la categoría.');
        }
      );
    }
  }

}
