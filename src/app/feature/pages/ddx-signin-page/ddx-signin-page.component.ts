import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { AuthPageDirective } from '@feature/templates/ddx-auth-page.template';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';
import { AuthFormData } from '@core/models';

@Component({
  selector: 'ddx-signin-page',
  templateUrl: './ddx-signin-page.component.html',
  styleUrls: [
    '../../public/ddx-auth-pages.scss',
    './ddx-signin-page.component.scss',
  ],
})
export class SignInPageComponent extends AuthPageDirective
  implements OnInit, AfterViewInit {
  constructor(
    protected formBuilder: FormBuilder,
    protected renderer: Renderer2,
    protected router: Router,
    protected authService: AuthService
  ) {
    super(formBuilder, renderer, router, authService);
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      token: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  onSubmit(): void {
    this.setLoadingOn();
    this.formErrors = {};

    const formData = this.authForm.value;
    this.authService.requestSignIn(formData as AuthFormData).subscribe(
      (response) => {
        this.setLoadingOff();
        this.router.navigateByUrl('/');
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
