import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { TraderRESTService } from '@core/services/REST';
import { Router } from '@angular/router';
import { TraderService } from '@core/services';
import { ProButtonComponent } from '@widget/components';

@Component({
  selector: 'ddx-kyc-done',
  templateUrl: './ddx-kyc-done.component.html',
  styleUrls: ['./ddx-kyc-done.component.scss'],
})
export class KYCDonePageComponent {
  @ViewChild('submitButton') submitButton: ProButtonComponent;

  constructor(
    private renderer: Renderer2,
    private restService: TraderRESTService,
    private traderService: TraderService,
    private router: Router
  ) {}

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
