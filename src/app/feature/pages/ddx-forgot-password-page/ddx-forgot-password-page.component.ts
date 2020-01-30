import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ddx-forgot-password-page',
  templateUrl: './ddx-forgot-password-page.component.html',
  styleUrls: [
    '../../public/ddx-auth-pages.scss',
    './ddx-forgot-password-page.component.scss',
  ],
})
export class ForgotPasswordPageComponent implements OnInit {
  private feedbackMessage: string;

  constructor() {}

  get message(): string {
    return this.feedbackMessage;
  }

  ngOnInit() {}

  onSubmit(): void {}
}
