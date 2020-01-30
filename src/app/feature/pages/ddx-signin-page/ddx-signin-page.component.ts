import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ddx-signin-page',
  templateUrl: './ddx-signin-page.component.html',
  styleUrls: [
    '../../public/ddx-auth-pages.scss',
    './ddx-signin-page.component.scss',
  ],
})
export class SignInPageComponent implements OnInit {
  private feedbackMessage: string;

  constructor() {}

  get message(): string {
    return this.feedbackMessage;
  }

  ngOnInit() {}

  onSubmit(): void {}
}
