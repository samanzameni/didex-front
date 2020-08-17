import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankingRESTService } from '@core/services/REST';

@Component({
  selector: 'ddx-withdraw-confirmation',
  templateUrl: './ddx-withdraw-confirmation.component.html',
  styleUrls: ['./ddx-withdraw-confirmation.component.scss'],
})
export class WithdrawConfirmationPageComponent implements OnInit {
  private requestId: number;
  private token: string;

  private currentPageState: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bankingService: BankingRESTService
  ) {
    this.currentPageState = 'waiting';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.requestId = parseInt(params.requestId, 10);
      this.token = params.token;

      this.bankingService
        .requestWithdrawConfirm({
          requestId: this.requestId,
          token: this.token,
        })
        .subscribe(
          (response) => {
            this.currentPageState = 'success';
            setTimeout(() => {
              this.router.navigateByUrl('/account/funds');
            }, 1500);
          },
          (errorResponse) => {
            this.currentPageState = 'failed';
          }
        );
    });
  }

  get currentState(): string {
    return this.currentPageState;
  }
}
