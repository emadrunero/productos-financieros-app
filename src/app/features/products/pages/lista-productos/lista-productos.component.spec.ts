import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListaProductosComponent } from './lista-productos.component';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PRODUCTOS_SERVICE } from '../../services/product-service/productos.token';
import { of, throwError } from 'rxjs';

describe('ListaProductosComponent', () => {
  let component: ListaProductosComponent;
  let fixture: ComponentFixture<ListaProductosComponent>;
  const mockService = {
    getProductos: jest.fn().mockReturnValue(of([])),
    crear: jest.fn().mockReturnValue(of({})),
    actualizar: jest.fn().mockReturnValue(of({})),
    eliminar: jest.fn().mockReturnValue(of({})),
    verificarId: jest.fn().mockReturnValue(of(false)),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ListaProductosComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        },
        {
          provide: PRODUCTOS_SERVICE,
          useValue: mockService
        }
      ]
    }).compileComponents();
    jest.clearAllMocks();
    mockService.getProductos.mockReturnValue(of([]));

    fixture = TestBed.createComponent(ListaProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // 1
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // 2
  it('debe filtrar productos', () => {
    component.dataSource.data = [
      { name: 'Producto Test' },
      { name: 'Otro producto' }
    ] as any;

    component.search = 'test';
    component.filter();

    const result = component.dataSource.filteredData;

    expect(result.length).toBe(1);
  });
  // 3
  it('debe manejar error al obtener productos', () => {
    mockService.getProductos.mockReturnValue(
      throwError(() => new Error('Error'))
    );

    fixture.detectChanges();

    expect(component.productos).toEqual([]);
  });
});
