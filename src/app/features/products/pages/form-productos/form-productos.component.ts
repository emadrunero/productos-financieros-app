import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MATERIAL_MODULES } from '../../../../shared/material/material';
import { ProductosService } from '../../services/productos.service';
import { catchError, map, of } from 'rxjs';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { InputCustomerComponent } from '../../../../shared/components/input-customer/input-customer.component';
import { minDateValidator } from '../../../../shared/validators/date.validator';
import { DatePickerComponent } from '../../../../shared/components/date-picker/date-picker.component';
import { CuadroDialogoComponent } from '../../../../shared/components/cuadro-dialogo/cuadro-dialogo.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-form-productos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputCustomerComponent,
    DatePickerComponent,
    CuadroDialogoComponent,
    ...MATERIAL_MODULES,
    TranslateModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  templateUrl: './form-productos.component.html',
  styleUrl: './form-productos.component.scss'
})
export class FormProductosComponent implements OnInit {
  isEdit = false;
  today = new Date(new Date().setHours(0, 0, 0, 0));
  isSaving = false;

  form = this.fb.group({
    id: this.fb.control<string>('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
      asyncValidators: [this.idValidator()],
      updateOn: 'blur'
    }),
    name: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
    description: this.fb.control<string>('', [Validators.required, Validators.minLength(10)]),
    logo: this.fb.control<string>('', Validators.required),
    date_release: this.fb.control<Date | null>(null, [
      Validators.required,
      minDateValidator(this.today)
    ]),
    date_revision: this.fb.control<Date | null>(null, Validators.required)
  });
  constructor(
    private readonly fb: FormBuilder,
    private readonly service: ProductosService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public readonly translate: TranslateService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.loadProduct(id);
    } else {
      this.isEdit = false;
    }
  }

  loadProduct(id: string) {
    const product = this.service.getProducto();
    if (!product) {
      this.router.navigate(['/products']);
    } else {
      this.form.patchValue({
        ...product,
        date_release: new Date(product.date_release),
        date_revision: new Date(product.date_revision)
      });

      const idControl = this.form.get('id');
      idControl?.clearValidators();
      idControl?.clearAsyncValidators();
      idControl?.updateValueAndValidity();
      this.form.get('date_release')?.clearValidators();
      this.form.get('date_release')?.updateValueAndValidity();
      //  deshabilitar
      idControl?.disable();

      this.form.updateValueAndValidity();
      this.isEdit = true;
    }
  }

  // VALIDADOR ASYNC (ID único)
  idValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {

      if (!control.value) {
        return of(null);
      } else {

        return this.service.verificarId(control.value).pipe(
          map((exists: boolean) => (exists ? { idExists: true } : null)),
          catchError(() => of(null))
        );
      }
    };
  }
  updateRevisionDate(fecha: Date) {
    if (!fecha) {
      return;
    } else {

      const date = new Date(fecha);

      // sumar 1 año
      date.setFullYear(date.getFullYear() + 1);

      if (date !== null)
        this.form.controls.date_revision.setValue(date);
    }
  }



  save() {
    if (this.form.invalid || this.isSaving) {
      return;
    } else {
      this.isSaving = true;
      const value = this.form.getRawValue() as any;
      if (!value) {
        return;
      } else {
        const request$ = this.isEdit
          ? this.service.actualizar(value.id, value)
          : this.service.crear(value);

        request$.subscribe({
          next: () => {
            this.router.navigate(['/products']);
          },
          error: () => {
            this.isSaving = false;
          }
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['/products']);
  }

}
