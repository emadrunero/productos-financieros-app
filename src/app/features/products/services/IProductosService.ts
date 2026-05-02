import { Observable } from "rxjs";
import { Productos } from "../models/productos.model";

export interface IProductosService {
  setProducto(productos: Productos[]): void;
  getProductos(): Observable<Productos[]>;
  getProducto(): Productos|null;
  crear(producto: Productos): Observable<any>;
  actualizar(id: string, producto: Partial<Productos>): Observable<any>;
  eliminar(id: string): Observable<any>;
  verificarId(id: string): Observable<boolean>;
}
