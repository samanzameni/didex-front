import { AbstractControl } from '@angular/forms';

export function shouldShowErrors(control: AbstractControl): boolean {
  return !!control.errors && (control.dirty || control.touched);
}
