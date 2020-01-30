import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  get message(): string {
    return this.feedbackMessage;
  }

  ngOnInit() {}

  onSubmit(): void {}
}
