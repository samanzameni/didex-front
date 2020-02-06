import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { CheckboxComponent } from '@widget/components';
import { mustMatch, isStrong } from '@core/util/validators';
import { AuthFormData } from '@core/models';
import { AuthService } from '@core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'ddx-signup-page',
  templateUrl: './ddx-signup-page.component.html',
  styleUrls: [
    '../../public/ddx-auth-pages.scss',
    './ddx-signup-page.component.scss',
  ],
})
export class SignUpPageComponent implements OnInit {
  private registerForm: FormGroup;

  @ViewChild(CheckboxComponent, { static: false }) checkbox: CheckboxComponent;
  @ViewChild('submitButton', { static: false }) submitButton: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
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

  shouldShowErrors(control: FormControl): boolean {
    return !!control.errors && (control.dirty || control.touched);
  }

  get registerFormGroup(): FormGroup {
    return this.registerForm;
  }

  get registerFormControls() {
    return this.registerForm.controls;
  }

  get isFormValid(): boolean {
    return this.registerForm.valid && !!this.checkbox && this.checkbox.isValid;
  }

  onSubmit(): void {
    this.renderer.addClass(this.submitButton.nativeElement, 'is-loading');

    const { confirmPassword, ...formData } = this.registerForm.value;
    this.authService.requestSignUp(formData as AuthFormData).subscribe(
      response => {
        this.renderer.removeClass(
          this.submitButton.nativeElement,
          'is-loading'
        );

        this.router.navigateByUrl('/');
      },
      errorResponse => {
        this.renderer.removeClass(
          this.submitButton.nativeElement,
          'is-loading'
        );
      }
    );
  }
}
