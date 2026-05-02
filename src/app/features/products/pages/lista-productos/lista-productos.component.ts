import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CuadroDialogoComponent } from '../../../../shared/components/cuadro-dialogo/cuadro-dialogo.component';
import { MATERIAL_MODULES } from '../../../../shared/material/material';
import { Router, RouterModule } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Productos } from '../../models/productos.model';
import { IProductosService } from '../../services/IProductosService';
import { PRODUCTOS_SERVICE } from '../../services/product-service/productos.token';


@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ...MATERIAL_MODULES,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.scss'
})
export class ListaProductosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  productos: Productos[] = [];
  dataSource = new MatTableDataSource<Productos>();
  filtered: Productos[] = [];

  search = '';
  pageSize = 5;

  constructor(
    @Inject(PRODUCTOS_SERVICE) private readonly service: IProductosService,
    private readonly dialog: MatDialog,
    public readonly translate: TranslateService,
    private readonly router: Router) { }


  ngOnInit() {
    this.dataSource.filterPredicate = (data: Productos, filter: string) =>
      data.name.toLowerCase().includes(filter);

    this.load();
  }

  load() {
    this.service.getProductos().subscribe(data => {
      this.productos = data;
      this.dataSource.data = data;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filter() {
    this.dataSource.filter = this.search.trim().toLowerCase();
  }

  delete(productos: Productos) {
    const confirmMessage = 'Id: ' + productos.id + ' - Nombre: ' + productos.name
    const dialogRef = this.dialog.open(CuadroDialogoComponent, {
      data: confirmMessage
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.eliminar(productos.id).subscribe(() => this.load());
      }
    });
  }
  edit(product: any) {
    this.service.setProducto(product);
    this.router.navigate(['/products/edit', product.id]);
  }
}
