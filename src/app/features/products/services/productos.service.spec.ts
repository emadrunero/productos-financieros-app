import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductosService } from './productos.service';

describe('ProductosService', () => {
  let service: ProductosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(ProductosService);
    httpMock = TestBed.inject(HttpTestingController); //  AQUÍ
  });

  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => { });
    jest.spyOn(console, 'log').mockImplementation(() => { });
    jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    httpMock.verify(); //  importante para cerrar requests
  });
  // 1

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // 2

  it('debe obtener productos', () => {
    const mockResponse = { data: [] };

    service.getProductos().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/bp/products'); // endpoint
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse); //  simula respuesta
  });

  // 3

  it('debe eliminar producto', () => {
    service.eliminar('1').subscribe();

    const req = httpMock.expectOne('/bp/products/1');
    expect(req.request.method).toBe('DELETE');
  });
});
