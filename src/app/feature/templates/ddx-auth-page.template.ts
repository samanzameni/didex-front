import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';
import { CheckboxComponent } from '@widget/components';

export abstract class AuthPage {
  protected authForm: FormGroup;

  @ViewChild('submitButton', { static: false }) submitButton: ElementRef;

  constructor(
    protected formBuilder: FormBuilder,
    protected renderer: Renderer2,
    protected router: Router,
    protected authService: AuthService
  ) {}

  protected shouldShowErrors(control: FormControl): boolean {
    return !!control.errors && (control.dirty || control.touched);
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
