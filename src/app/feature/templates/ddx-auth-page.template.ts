import { FormBuilder, FormGroup } from '@angular/forms';
import { Renderer2, ViewChild, Directive, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';
import { ProButtonComponent } from '@widget/components';
import { CONSTANTS } from '@core/util/constants';

declare const grecaptcha;

@Directive()
export abstract class AuthPageDirective {
  protected authForm: FormGroup;
  protected formErrors: any;

  @ViewChild('submitButton') submitButton: ProButtonComponent;
  @ViewChild('recaptcha', { static: true }) recaptchaElement: ElementRef;

  constructor(
    protected formBuilder: FormBuilder,
    protected renderer: Renderer2,
    protected router: Router,
    protected authService: AuthService
  ) {
    this.formErrors = {};
    this.addRecaptchaScript();
  }

  protected setLoadingOn(): void {
    this.submitButton.setLoadingOn();
  }

  protected setLoadingOff(): void {
    this.submitButton.setLoadingOff();
  }

  protected addRecaptchaScript() {
    // tslint:disable-next-line: no-string-literal
    window['grecaptchaCallback'] = () => {
      this.renderReCaptcha();
    };

    ((d, s, id, obj) => {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src =
        'https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'recaptcha-jssdk', this);
  }

  renderReCaptcha() {
    // tslint:disable-next-line: no-string-literal
    window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
      sitekey: CONSTANTS.RECAPTCHA_SITE_KEY,
      theme: 'dark',
      callback: (response) => {
        if (typeof response === 'string') {
          this.setReCaptchaToken(response);
        }
      },
    });
  }

  get authFormGroup(): FormGroup {
    return this.authForm;
  }

  get authFormControls() {
    return this.authForm.controls;
  }

  get authFormErrors(): any {
    return this.formErrors;
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

  setReCaptchaToken(token: string): void {
    this.authForm.controls.token.setValue(token);
  }

  abstract onSubmit(): void;
}
