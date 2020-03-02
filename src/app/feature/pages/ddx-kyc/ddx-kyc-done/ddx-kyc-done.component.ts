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

@Component({
  selector: 'ddx-kyc-done',
  templateUrl: './ddx-kyc-done.component.html',
  styleUrls: ['./ddx-kyc-done.component.scss'],
})
export class KYCDonePageComponent {
  @ViewChild('submitButton') submitButton: ElementRef;

  constructor(
    private renderer: Renderer2,
    private restService: TraderRESTService,
    private traderService: TraderService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.renderer.addClass(this.submitButton.nativeElement, 'is-loading');

    this.restService.requestKYCApproval().subscribe(
      response => {
        this.traderService.updateCurrentTrader().subscribe(
          trader => {
            this.renderer.removeClass(
              this.submitButton.nativeElement,
              'is-loading'
            );
            this.router.navigateByUrl('/user/settings');
          },
          error => {
            this.renderer.removeClass(
              this.submitButton.nativeElement,
              'is-loading'
            );
          }
        );
      },
      errorResponse => {
        this.renderer.removeClass(
          this.submitButton.nativeElement,
          'is-loading'
        );
      }
    );
  }
}
