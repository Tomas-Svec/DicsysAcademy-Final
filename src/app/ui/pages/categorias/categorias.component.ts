import { Component } from '@angular/core';
import { UrlNavigateService } from '../../../data/services/url-navigate.service';
import { GlobalText } from '../../../data/text';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router } from '@angular/router';
import { CategoriasService } from '../../../data/services/categorias/categorias.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {
  nuevaCategoria = {nombre: ''};
  errorMensaje = ''; // Variable para manejar el mensaje de error



    constructor(
      public urlNavigateSerice: UrlNavigateService,
      public globalText: GlobalText,
      public router:Router,
      private categoriasService: CategoriasService,
    ){

    }

    crearCategoria(): void {
      // Validar que el nombre no esté vacío o sea solo espacios
      if (!this.nuevaCategoria.nombre.trim()) {
        this.errorMensaje = 'El nombre de la categoría no puede estar vacío.';
        return;
      }
  
      this.errorMensaje = ''; // Limpiar mensaje de error si pasa la validación
  
      this.categoriasService.createCategoria(this.nuevaCategoria).subscribe({
        next: (response) => {
          console.log('Categoría creada:', response);
          this.nuevaCategoria.nombre = ''; // Limpiar el formulario
          this.router.navigate(['/']); // Redirigir al index
        },
        error: (error) => {
          console.error('Error al crear la categoría:', error);
          this.errorMensaje = 'Ocurrió un error al crear la categoría. Inténtalo de nuevo.';
        }
      });
    }

}
