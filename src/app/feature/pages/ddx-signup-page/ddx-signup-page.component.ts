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
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { CheckboxComponent } from '@widget/components';
import { mustMatch, isStrong } from '@core/util/validators';
import { AuthRESTService } from '@core/services/REST';
import { AuthFormData } from '@core/models';

@Component({
  selector: 'ddx-signup-page',
  templateUrl: './ddx-signup-page.component.html',
  styleUrls: [
    '../../public/ddx-auth-pages.scss',
    './ddx-signup-page.component.scss',
  ],
})
export class SignUpPageComponent implements OnInit {
  private feedbackMessage: string;
  private registerForm: FormGroup;

  @ViewChild(CheckboxComponent, { static: false }) checkbox: CheckboxComponent;
  @ViewChild('submitButton', { static: false }) submitButton: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private restService: AuthRESTService,
    private renderer: Renderer2
  ) {}

  get message(): string {
    return this.feedbackMessage;
  }

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
    this.feedbackMessage = '';

    const { confirmPassword, ...formData } = this.registerForm.value;
    this.restService.requestRegister(formData as AuthFormData).subscribe(
      response => {
        console.log(response);
        this.renderer.removeClass(
          this.submitButton.nativeElement,
          'is-loading'
        );
      },
      errorResponse => {
        console.log(errorResponse);
        this.renderer.removeClass(
          this.submitButton.nativeElement,
          'is-loading'
        );
      }
    );
  }
}
