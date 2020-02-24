import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { ViewChild, ElementRef, Renderer2, Directive } from '@angular/core';
import { Router } from '@angular/router';

@Directive()
export abstract class KYCPageDirective {
  protected kycForm: FormGroup;

  @ViewChild('submitButton') submitButton: ElementRef;

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
