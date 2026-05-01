import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormGroup, FormControl } from '@angular/forms';
import { DatePickerComponent } from './date-picker.component';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerComponent, TranslateModule.forRoot(),NoopAnimationsModule],
      providers: [
        {
          provide: ControlContainer,
          useValue: {
            control: new FormGroup({
              date_release: new FormControl(null)
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;

    component.controlName = 'date_release'; // CLAVE

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
