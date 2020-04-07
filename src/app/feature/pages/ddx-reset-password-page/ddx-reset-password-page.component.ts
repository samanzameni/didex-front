import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services';
import { AuthPageDirective } from '@feature/templates';
import { FormBuilder, Validators } from '@angular/forms';
import { mustMatch, isStrong } from '@core/util/validators';

@Component({
  selector: 'ddx-reset-password-page',
  templateUrl: './ddx-reset-password-page.component.html',
  styleUrls: [
    '../../public/ddx-auth-pages.scss',
    './ddx-reset-password-page.component.scss',
  ],
})
export class ResetPasswordPageComponent extends AuthPageDirective
  implements OnInit, AfterViewInit {
  private email: string;
  private token: string;

  private formAllErrors: string[];

  constructor(
    protected formBuilder: FormBuilder,
    protected renderer: Renderer2,
    protected route: ActivatedRoute,
    protected authService: AuthService,
    protected router: Router
  ) {
    super(formBuilder, renderer, router, authService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params.email;
      this.token = params.token;
    });

    this.authForm = this.formBuilder.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: [
          mustMatch('newPassword', 'confirmPassword'),
          isStrong('newPassword'),
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

  get allErrors(): string[] {
    return this.formAllErrors || [];
  }

  onSubmit(): void {
    this.setLoadingOn();

    const dataToSend = this.authForm.value;
    dataToSend.email = this.email;
    dataToSend.token = this.token;

    this.authService.requestNewPassword(dataToSend).subscribe(
      (response) => {
        this.setLoadingOff();
        setTimeout(() => {
          this.router.navigateByUrl('/auth/signin');
        }, 1500);
      },
      (errorResponse) => {
        this.setLoadingOff();

        if (errorResponse.status >= 500) {
          this.formAllErrors = ['Server error ...'];
        } else if (errorResponse.status === 400) {
          this.formAllErrors = ['Invalid token'];
        }
      }
    );
  }
}
