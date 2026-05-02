import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Productos } from '../models/productos.model';
import { LoggerService } from '../../../core/services/logger.service';
import { IProductosService } from './IProductosService';


const baseUrl = '/bp/products';
@Injectable({
  providedIn: 'root'
})
export class ProductosService implements IProductosService {

  private productoSelected: Productos | null = null;

  constructor(private readonly http: HttpClient, private readonly logger: LoggerService) { }

  getProductos(): Observable<Productos[]> {
    return this.http.get<{ data: Productos[] }>(baseUrl)
      .pipe(map(res => res.data));
  }

  crear(productos: Productos) {
    return this.http.post(baseUrl, productos);
  }

  actualizar(id: string, productos: Partial<Productos>) {
    this.logger.log('Actualizando producto', { id, producto: productos });
    return this.http.put(`${baseUrl}/${id}`, productos);
  }

  eliminar(id: string) {
    this.logger.warn('Eliminando producto', id);
    return this.http.delete(`${baseUrl}/${id}`);
  }

  verificarId(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${baseUrl}/verification/${id}`);
  }

  setProducto(product: any) {
    this.productoSelected = product;
  }

  getProducto() {
    return this.productoSelected;
  }
}
