import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, Output, EventEmitter, Optional, Self,  OnInit } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  standalone: true,
  imports: [

    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule


  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() minDate: Date | null = null;
  @Output() dateChange = new EventEmitter<Date>();
  public value: Date | null = null;
  public onChange: any = () => { };
  public onTouched: any = () => { };

  constructor(@Self() @Optional() public ngControl: NgControl,
    private readonly controlContainer: ControlContainer) {

  }


  ngOnInit() {
    this.control.valueChanges.subscribe(value => {
      if (value) {
        this.dateChange.emit(value);
      }
    });
  }

  writeValue(value: Date): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  get control(): FormControl {
    return this.controlContainer.control?.get(this.controlName) as FormControl;
  }

  onDateSelected(event: any) {
    const value = event.value;

    this.control.setValue(value); // 🔥 asegura sincronización
    this.control.markAsTouched();

    this.dateChange.emit(value);
  }
}
