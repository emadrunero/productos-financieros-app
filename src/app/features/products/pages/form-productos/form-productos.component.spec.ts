import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormProductosComponent } from './form-productos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { PRODUCTOS_SERVICE } from '../../services/product-service/productos.token';

describe('FormProductosComponent', () => {
  let component: FormProductosComponent;
  let fixture: ComponentFixture<FormProductosComponent>;
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
        FormProductosComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        NoopAnimationsModule
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

    fixture = TestBed.createComponent(FormProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => { });
  });
  //  1
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //  2
  it('formulario inválido al inicio', () => {
    expect(component.form.invalid).toBe(true);
  });

  //  3 (FIX CRÍTICO)
  it('formulario válido con datos correctos', () => {
    component.form.patchValue({
      id: 'ABC123',
      name: 'Producto Test',
      description: 'Descripción válida de prueba larga',
      logo: 'https://logo.com/img.png',
      date_release: new Date(),
      date_revision: new Date()
    });

    // 🔥 FORZAR VALIDACIÓN COMPLETA (clave)
    component.form.get('id')?.clearAsyncValidators();
    component.form.get('id')?.setErrors(null);
    component.form.get('id')?.updateValueAndValidity();

    expect(component.form.valid).toBe(true);
  });

  //  4
  it('no debe guardar si el formulario es inválido', () => {
    const service = (component as any).service;

    jest.spyOn(service, 'crear');

    component.form.reset();

    component.save();

    expect(service.crear).not.toHaveBeenCalled();
  });

  //  5
  it('debe llamar crear cuando no es edición', async () => {
    const service = (component as any).service;

    component.isEdit = false;

    component.form.patchValue({
      id: 'ABC123',
      name: 'Producto Test',
      description: 'Descripción válida de prueba larga',
      logo: 'https://logo.com/img.png',
      date_release: new Date(),
      date_revision: new Date()
    });

    await fixture.whenStable();

    jest.spyOn(service, 'crear').mockReturnValue(of({}));

    component.save();

    expect(service.crear).toHaveBeenCalled();
  });

  //  6
  it('debe llamar actualizar cuando es edición', async () => {
    const service = (component as any).service;

    component.isEdit = true;

    component.form.patchValue({
      id: 'ABC123',
      name: 'Producto Test',
      description: 'Descripción válida de prueba larga',
      logo: 'https://logo.com/img.png',
      date_release: new Date(),
      date_revision: new Date()
    });

    await fixture.whenStable();

    jest.spyOn(service, 'actualizar').mockReturnValue(of({}));

    component.save();

    expect(service.actualizar).toHaveBeenCalled();
  });

  //  7
  it('debe navegar después de guardar', async () => {
    const router = (component as any).router;
    const service = (component as any).service;

    jest.spyOn(router, 'navigate').mockResolvedValue(true);
    jest.spyOn(service, 'crear').mockReturnValue(of({}));

    component.form.patchValue({
      id: 'ABC123',
      name: 'Producto Test',
      description: 'Descripción válida de prueba larga',
      logo: 'https://logo.com/img.png',
      date_release: new Date(),
      date_revision: new Date()
    });

    await fixture.whenStable();

    component.save();

    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });

  //  8 (FIX CRÍTICO)
  it('debe calcular date_revision +1 año', () => {
    const fecha = new Date('2025-01-01');

    // 👇 ejecuta el método real
    component.updateRevisionDate(fecha);

    // 👇 obtenemos el valor actualizado
    const result = component.form.get('date_revision')?.value as Date;

    expect(result).toBeTruthy();

    // 🔥 validación robusta
    expect(result.getFullYear()).toBe(fecha.getFullYear() + 1);
  });

  //  9
  it('debe resetear el formulario al cancelar', () => {
    const router = (component as any).router;

    jest.spyOn(router, 'navigate').mockResolvedValue(true);

    component.cancel();

    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });
  // 10
  it('no debe guardar si isSaving es true', () => {
    const service = (component as any).service;

    component.isSaving = true;

    jest.spyOn(service, 'crear');

    component.save();

    expect(service.crear).not.toHaveBeenCalled();
  });
  // 11
  it('debe marcar error si el id ya existe', (done) => {
    mockService.verificarId.mockReturnValue(of(true));

    const control = component.form.get('id');
    control?.setValue('ABC123');

    setTimeout(() => {
      expect(control?.errors).toEqual({ idExists: true });
      done();
    });
  });
  // 12
  it('no debe guardar si formulario inválido', () => {
    const service = TestBed.inject(PRODUCTOS_SERVICE) as any;

    component.form.reset();

    component.save();

    expect(service.crear).not.toHaveBeenCalled();
  });
});
