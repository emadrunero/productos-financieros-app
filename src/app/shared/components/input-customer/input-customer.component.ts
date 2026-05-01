import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-input-customer',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TranslateModule],
  templateUrl: './input-customer.component.html',
  styleUrl: './input-customer.component.scss'
})
export class InputCustomerComponent implements OnInit {

  @Input() label!: string;
  @Input() placeholder?: string;
  @Input() icon?: string;
  @Input() controlName!: string;
  @Input() maxLength?: number;
  @Input() minLength?: number;
  @Input() showCounter: boolean = false;


  length$!: Observable<number>;

  constructor(private readonly controlContainer: ControlContainer) { }

  ngOnInit() {
    this.length$ = this.control.valueChanges.pipe(
      startWith(this.control.value),
      map(value => value?.length || 0)
    );

  }
  validatePlaceholder(): string {
    if (!this.placeholder) {
      return this.label;
    }
    return this.placeholder;
  }

  get control(): FormControl {
    return this.controlContainer.control?.get(this.controlName) as FormControl;
  }

}
