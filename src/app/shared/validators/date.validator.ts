import { AbstractControl, ValidationErrors } from '@angular/forms';

export function minDateValidator(minDate: Date) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const selected = new Date(control.value);
    selected.setHours(0, 0, 0, 0);

    const min = new Date(minDate);
    min.setHours(0, 0, 0, 0);

    return selected < min ? { minDate: true } : null;
  };
}
