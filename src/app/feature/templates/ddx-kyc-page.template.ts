import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

export abstract class KYCPage {
  protected kycForm: FormGroup;

  @ViewChild('submitButton', { static: false }) submitButton: ElementRef;

  constructor(
    protected router: Router,
    protected el: ElementRef,
    protected renderer: Renderer2,
    protected formBuilder: FormBuilder
  ) {}

  public shouldShowErrors(control: AbstractControl): boolean {
    return !!control.errors && (control.dirty || control.touched);
  }

  protected setLoadingOn(): void {
    this.renderer.addClass(this.submitButton.nativeElement, 'is-loading');
  }

  protected setLoadingOff(): void {
    this.renderer.removeClass(this.submitButton.nativeElement, 'is-loading');
  }

  get kycFormGroup(): FormGroup {
    return this.kycForm;
  }

  get kycFormControls() {
    return this.kycForm.controls;
  }

  get isFormValid(): boolean {
    return this.kycForm.valid;
  }

  abstract onSubmit(): void;
}
