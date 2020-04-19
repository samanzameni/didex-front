import {
  Component,
  OnInit,
  ViewChild,
  Renderer2,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CheckboxComponent } from '@widget/components';
import { mustMatch, isStrong } from '@core/util/validators';
import { AuthFormData } from '@core/models';
import { AuthService } from '@core/services';
import { Router } from '@angular/router';
import { AuthPageDirective } from '@feature/templates/ddx-auth-page.template';
import { MatCheckbox } from '@angular/material/checkbox';
import { environment } from '@environments/environment';

@Component({
  selector: 'ddx-signup-page',
  templateUrl: './ddx-signup-page.component.html',
  styleUrls: [
    '../../public/ddx-auth-pages.scss',
    './ddx-signup-page.component.scss',
  ],
})
export class SignUpPageComponent extends AuthPageDirective
  implements OnInit, AfterViewInit {
  @ViewChild(MatCheckbox) checkbox: MatCheckbox;

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
        acceptedTerms: [false, [Validators.requiredTrue]],
        token: ['', environment.production ? [Validators.required] : []],
      },
      {
        validators: [
          mustMatch('password', 'confirmPassword'),
          isStrong('password'),
        ],
      }
    );
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  get isFormValid(): boolean {
    return this.authForm.valid;
  }

  onSubmit(): void {
    this.setLoadingOn();
    this.formErrors = {};

    const { confirmPassword, acceptedTerms, ...formData } = this.authForm.value;
    this.authService.requestSignUp(formData as AuthFormData).subscribe(
      (response) => {
        this.setLoadingOff();
        this.router.navigateByUrl('/auth/signup/success');
      },
      (errorResponse) => {
        this.setLoadingOff();

        if (errorResponse.status === 400) {
          const errors = errorResponse.error.errors;

          if (errors.email) {
            this.formErrors.email = errors.email;
          }

          if (errors.password) {
            this.formErrors.password = errors.password;
          }

          for (const key of Object.keys(errors)) {
            if (!['email', 'password'].includes(key)) {
              alert(`An error occured: There is something wrong with ${key}`);
            }
          }
        }
      }
    );
  }
}
