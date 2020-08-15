import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BankingRESTService,
  BankAccountRESTService,
} from '@core/services/REST';

@Component({
  selector: 'ddx-fiat-deposit-callback-handler',
  templateUrl: './ddx-fiat-deposit-callback-handler.component.html',
  styleUrls: ['./ddx-fiat-deposit-callback-handler.component.scss'],
})
export class DepositCallbackHandlerPageComponent implements OnInit {
  private payment_status: string;
  private token: string;

  private currentPageState: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bankAccountService: BankAccountRESTService
  ) {
    this.currentPageState = 'waiting';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.payment_status = params.payment_status;
      this.token = params.token;

      if (this.payment_status === 'OK') {
        this.bankAccountService
          .requestDepositFiatVerify({ token: this.token })
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
      } else {
        this.currentPageState = 'failed';
      }
    });
  }

  get currentState(): string {
    return this.currentPageState;
  }
}
