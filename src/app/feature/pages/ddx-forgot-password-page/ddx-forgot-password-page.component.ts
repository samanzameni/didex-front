import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthPageDirective } from '@feature/templates/ddx-auth-page.template';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';
import { AuthResetPasswordFormData } from '@core/models';

@Component({
  selector: 'ddx-forgot-password-page',
  templateUrl: './ddx-forgot-password-page.component.html',
  styleUrls: [
    '../../public/ddx-auth-pages.scss',
    './ddx-forgot-password-page.component.scss',
  ],
})
export class ForgotPasswordPageComponent extends AuthPageDirective
  implements OnInit {
  submittedEmail: string;

  constructor(
    protected formBuilder: FormBuilder,
    protected renderer: Renderer2,
    protected router: Router,
    protected authService: AuthService
  ) {
    super(formBuilder, renderer, router, authService);
    this.submittedEmail = '';
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    this.submittedEmail = '';
    this.setLoadingOn();

    const formData = this.authForm.value;
    this.authService
      .requestResetPassword(formData as AuthResetPasswordFormData)
      .subscribe(
        response => {
          this.setLoadingOff();
          this.submittedEmail = formData.email;
          console.log(response);
        },
        errorResponse => {
          this.setLoadingOff();
        }
      );
  }
}
