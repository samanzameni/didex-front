import {
  FormBuilder,
  FormGroup,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { Renderer2, ViewChild, ElementRef, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';
import { shouldShowErrors } from '@core/util/forms';
import { ProButtonComponent } from '@widget/components';

@Directive()
export abstract class AuthPageDirective {
  protected authForm: FormGroup;

  @ViewChild('submitButton') submitButton: ProButtonComponent;

  constructor(
    protected formBuilder: FormBuilder,
    protected renderer: Renderer2,
    protected router: Router,
    protected authService: AuthService
  ) {}

  public shouldShowErrors(control: AbstractControl): boolean {
    return shouldShowErrors(control);
  }

  protected setLoadingOn(): void {
    this.submitButton.setLoadingOn();
  }

  protected setLoadingOff(): void {
    this.submitButton.setLoadingOff();
  }

  get authFormGroup(): FormGroup {
    return this.authForm;
  }

  get authFormControls() {
    return this.authForm.controls;
  }

  get isFormValid(): boolean {
    return this.authForm.valid;
  }

  hasNumber(): boolean {
    return /\d/.test(this.authForm.controls.password.value);
  }
  hasUpper(): boolean {
    return /[A-Z]/.test(this.authForm.controls.password.value);
  }
  hasLower(): boolean {
    return /[a-z]/.test(this.authForm.controls.password.value);
  }
  hasSpecial(): boolean {
    return /[!@#$%^&*_?]/.test(this.authForm.controls.password.value);
  }
  isAtLeastEightCharacters(): boolean {
    return (
      this.authForm.controls.password.value &&
      this.authForm.controls.password.value.length >= 8
    );
  }

  abstract onSubmit(): void;
}
