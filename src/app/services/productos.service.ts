import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoProducto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: InfoProducto[] = [];
  productosFiltrado: InfoProducto[] = [];

  constructor( private http: HttpClient ) { 

   this.cargarProductos(); 
  }

  private cargarProductos(){

      return new Promise( ( resolve, reject ) => {

        this.http.get('https://angular-html-d6cfb.firebaseio.com/productos_idx.json')
          .subscribe( (resp: InfoProducto[]) => {
            // console.log( resp );
            this.productos = resp;
            this.cargando = false;

            resolve();
  
            // para probar el loading
            // setTimeout(() => {
            //   this.cargando = false;
            // }, 2000);
            
          } );

      } )

  }

  getProducto( id: string ){

    return this.http.get(`https://angular-html-d6cfb.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string ){

    if( this.productos.length === 0 ){
      // cargar productos
      this.cargarProductos().then( () => {
        // ejecutar despues de tener los productos
        // Aqui aplicar filtro
        this.filtrarProductos( termino );
      } )
    } else {
      // aplicar filtro
      this.filtrarProductos( termino );
    }

    // this.productosFiltrado = this.productos.filter( producto => {
    //   return true;
    // } );

    // console.log( this.productosFiltrado );
    
  }

  private filtrarProductos( termino: string ){
    console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();
    
    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();
      
      if( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ){
        this.productosFiltrado.push( prod );
      }

    } )

  }
}
