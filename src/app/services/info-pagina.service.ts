import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina, InfoEquipo } from '../interfaces/info-pagina.service';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  // infoEquipo: InfoEquipo = {};
  infoEquipo: InfoEquipo[] = [];
  cargada = false;

  constructor( private http: HttpClient ) { 

    console.log('Servicio de Info Página listo!');

    // Leer archivo JSON
    this.cargarInfo();
    this.cargarEquipo();
    
  }

  private cargarInfo(){
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: InfoPagina) => {
      this.cargada = true;
      this.info = resp;
      console.log(resp);
      
    } )
  }

  private cargarEquipo(){
    this.http.get('https://angular-html-d6cfb.firebaseio.com/equipo.json')
    .subscribe( (resp: InfoEquipo[]) => {
      this.cargada = true;
      this.infoEquipo = resp;
      console.log(resp);
      
    } )
  }

}
