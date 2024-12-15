import { Routes } from '@angular/router';
import { HomeComponent } from './ui/pages/home/home.component';
import { ProductosComponent } from './ui/pages/productos/productos.component';
import { ModificarComponent } from './ui/pages/modificar/modificar.component';
import { AgregarComponent } from './ui/pages/agregar/agregar.component';
import { CategoriasComponent } from './ui/pages/categorias/categorias.component';
import { CarritoComponentComponent } from './ui/pages/carrito-component/carrito-component.component';

//RUTAS

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'productos',
        component: ProductosComponent,
    },
    {
        path: 'modificar',
        component: ModificarComponent,
    },
    {
        path: 'agregar',
        component: AgregarComponent,
    },
    {
        path: 'categorias',
        component: CategoriasComponent
    },
    {
        path: 'carrito',
        component: CarritoComponentComponent
    }
    
];
