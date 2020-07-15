import { Component, Renderer2, ViewChild } from '@angular/core';
import { TraderRESTService } from '@core/services/REST';
import { Router } from '@angular/router';
import { TraderService } from '@core/services';
import { ProButtonComponent } from '@widget/components';

@Component({
  selector: 'ddx-kyc-done',
  templateUrl: './ddx-kyc-done.component.html',
  styleUrls: [
    '../../../public/ddx-kyc-pages.scss',
    './ddx-kyc-done.component.scss',
  ],
})
export class KYCDonePageComponent {
  @ViewChild('submitButton') submitButton: ProButtonComponent;

  constructor(
    private renderer: Renderer2,
    private restService: TraderRESTService,
    private traderService: TraderService,
    private router: Router
  ) {}

  get currentTraderStatus(): string {
    //when would it ever return newbie whilst in the last stage of KYC?!
    switch (true) {
      case this.traderService.isRejected:
        console.log('rejected');
        return 'rejected';
      case this.traderService.hasSentKYC:
        console.log('sent');
        return 'sent';
      case this.traderService.hasKYCApproved:
        console.log('approved');
        return 'approved';
      case this.traderService.isBanned:
        console.log('banned');
        return 'banned';
      default:
        console.log('newbie');
        return 'newbie';
    }
  }

  onSubmit(): void {
    this.submitButton.setLoadingOn();

    this.restService.requestKYCApproval().subscribe(
      (response) => {
        this.traderService.updateCurrentTrader().subscribe(
          (trader) => {
            this.submitButton.setLoadingOff();
            this.router.navigateByUrl('/user/settings?tab=kyc', {
              queryParams: { tab: 'kyc' },
            });
          },
          (error) => {
            this.submitButton.setLoadingOff();
          }
        );
      },
      (errorResponse) => {
        this.submitButton.setLoadingOff();
      }
    );
  }
}
