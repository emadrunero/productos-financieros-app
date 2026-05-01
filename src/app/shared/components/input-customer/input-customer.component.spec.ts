import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputCustomerComponent } from './input-customer.component';
import { TranslateModule } from '@ngx-translate/core';
import { ControlContainer, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('InputCustomerComponent', () => {
  let component: InputCustomerComponent;
  let fixture: ComponentFixture<InputCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCustomerComponent, TranslateModule.forRoot(),NoopAnimationsModule],
      providers: [
        {
          provide: ControlContainer,
          useValue: {
            control: new FormGroup({
              name: new FormControl('')
            })
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InputCustomerComponent);
    component = fixture.componentInstance;
    component.controlName = 'name';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
