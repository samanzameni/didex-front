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

@Directive()
export abstract class AuthPageDirective {
  protected authForm: FormGroup;

  @ViewChild('submitButton') submitButton: ElementRef;

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
    this.renderer.addClass(this.submitButton.nativeElement, 'is-loading');
  }

  protected setLoadingOff(): void {
    this.renderer.removeClass(this.submitButton.nativeElement, 'is-loading');
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

  abstract onSubmit(): void;
}
