import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services';

@Component({
  selector: 'ddx-activate-email-page',
  templateUrl: './ddx-activate-email-page.component.html',
  styleUrls: [
    '../../public/ddx-auth-pages.scss',
    './ddx-activate-email-page.component.scss',
  ],
})
export class ActivateEmailPageComponent implements OnInit {
  private email: string;
  private token: string;

  private currentPageState: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.currentPageState = 'waiting';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params.email;
      this.token = params.token;

      this.authService
        .requestVerifyEmail({ email: this.email, token: this.token })
        .subscribe(
          response => {
            this.currentPageState = 'success';
            setTimeout(() => {
              this.router.navigateByUrl('/');
            }, 1500);
          },
          errorResponse => {
            this.currentPageState = 'failed';
          }
        );
    });
  }

  get currentState(): string {
    return this.currentPageState;
  }
}
