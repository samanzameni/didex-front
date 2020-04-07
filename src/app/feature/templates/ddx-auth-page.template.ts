import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Renderer2,
  ViewChild,
  Directive,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';
import { ProButtonComponent } from '@widget/components';
import { CONSTANTS } from '@core/util/constants';

@Directive()
export abstract class AuthPageDirective implements AfterViewInit {
  protected authForm: FormGroup;
  protected formErrors: any;

  @ViewChild('submitButton') submitButton: ProButtonComponent;
  @ViewChild('recaptcha') recaptchaElement: ElementRef;

  constructor(
    protected formBuilder: FormBuilder,
    protected renderer: Renderer2,
    protected router: Router,
    protected authService: AuthService
  ) {
    this.formErrors = {};
  }

  ngAfterViewInit(): void {
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
      js.async = true;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'recaptcha-jssdk', this);
  }

  renderReCaptcha() {
    // tslint:disable-next-line: no-string-literal
    window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
      sitekey: '6LcgguIUAAAAAE1GXYfJd7z-uEah67Dd9kTgWcpz',
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

  hasNumber(value: string): boolean {
    return /\d/.test(value);
  }
  hasUpper(value: string): boolean {
    return /[A-Z]/.test(value);
  }
  hasLower(value: string): boolean {
    return /[a-z]/.test(value);
  }
  hasSpecial(value: string): boolean {
    return /[!@#$%^&*_?]/.test(value);
  }
  isAtLeastEightCharacters(value: string): boolean {
    return value && value.length >= 8;
  }

  setReCaptchaToken(token: string): void {
    this.authForm.controls.token.setValue(token);
  }

  abstract onSubmit(): void;
}
