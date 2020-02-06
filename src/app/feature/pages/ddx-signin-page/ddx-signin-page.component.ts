import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthPage } from '@feature/templates/ddx-auth-page.template';
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
export class SignInPageComponent extends AuthPage implements OnInit {
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
    });
  }

  onSubmit(): void {
    this.setLoadingOn();

    const formData = this.authForm.value;
    this.authService.requestSignIn(formData as AuthFormData).subscribe(
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
