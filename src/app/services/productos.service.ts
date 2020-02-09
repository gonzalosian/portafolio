import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoProducto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: InfoProducto[] = [];

  constructor( private http: HttpClient ) { 

   this.cargarProductos(); 
  }

  private cargarProductos(){
      this.http.get('https://angular-html-d6cfb.firebaseio.com/productos_idx.json')
        .subscribe( (resp: InfoProducto[]) => {
          console.log( resp );
          this.productos = resp;
          this.cargando = false;

          // para probar el loading
          // setTimeout(() => {
          //   this.cargando = false;
          // }, 2000);
          
        } );
  }
}
