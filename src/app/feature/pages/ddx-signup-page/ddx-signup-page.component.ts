import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { CheckboxComponent } from '@widget/components';
import { mustMatch, isStrong } from '@core/util/validators';

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

  constructor(private formBuilder: FormBuilder) {}

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

  get registerFormControls(): {
    [key: string]: AbstractControl;
  } {
    return this.registerForm.controls;
  }

  get isFormValid(): boolean {
    return this.registerForm.valid && !!this.checkbox && this.checkbox.isValid;
  }

  onSubmit(): void {
    const { confirmPassword, ...formData } = this.registerForm.value;
  }
}
