import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { ViewChild, ElementRef, Renderer2, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { TraderService } from '@core/services';
import { Trader } from '@core/models';
import { ThrowStmt } from '@angular/compiler';
import { shouldShowErrors } from '@core/util/forms';
import { ProButtonComponent } from '@widget/components';

@Directive()
export abstract class KYCPageDirective {
  protected kycForm: FormGroup;
  protected currentTrader: Trader;

  @ViewChild('submitButton') submitButton: ProButtonComponent;

  constructor(
    protected router: Router,
    protected el: ElementRef,
    protected renderer: Renderer2,
    protected formBuilder: FormBuilder,
    protected traderService: TraderService
  ) {
    this.currentTrader = this.traderService.currentTrader;
  }

  public shouldShowErrors(control: AbstractControl): boolean {
    return shouldShowErrors(control);
  }

  protected setLoadingOn(): void {
    // this.renderer.addClass(this.submitButton.nativeElement, 'is-loading');
    this.submitButton.setLoadingOn();
  }

  protected setLoadingOff(): void {
    // this.renderer.removeClass(this.submitButton.nativeElement, 'is-loading');
    this.submitButton.setLoadingOff();
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

  getKeys(object: any): string[] {
    return object ? Object.keys(object) : [];
  }

  abstract onSubmit(): void;
}
