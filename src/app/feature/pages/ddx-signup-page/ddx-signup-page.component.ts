import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CheckboxComponent } from '@widget/components';
import { mustMatch, isStrong } from '@core/util/validators';
import { AuthFormData } from '@core/models';
import { AuthService } from '@core/services';
import { Router } from '@angular/router';
import { AuthPageDirective } from '@feature/templates/ddx-auth-page.template';

@Component({
  selector: 'ddx-signup-page',
  templateUrl: './ddx-signup-page.component.html',
  styleUrls: [
    '../../public/ddx-auth-pages.scss',
    './ddx-signup-page.component.scss',
  ],
})
export class SignUpPageComponent extends AuthPageDirective implements OnInit {
  @ViewChild(CheckboxComponent) checkbox: CheckboxComponent;

  constructor(
    protected formBuilder: FormBuilder,
    protected renderer: Renderer2,
    protected router: Router,
    protected authService: AuthService
  ) {
    super(formBuilder, renderer, router, authService);
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: [
          mustMatch('password', 'confirmPassword'),
          isStrong('password'),
        ],
      }
    );
  }

  get isFormValid(): boolean {
    return this.authForm.valid && !!this.checkbox && this.checkbox.isValid;
  }

  onSubmit(): void {
    this.setLoadingOn();

    const { confirmPassword, ...formData } = this.authForm.value;
    this.authService.requestSignUp(formData as AuthFormData).subscribe(
      response => {
        this.setLoadingOff();
        this.router.navigateByUrl('/');
      },
      errorResponse => {
        this.setLoadingOff();
      }
    );
  }
}
