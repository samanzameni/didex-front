import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { KYCPageDirective } from '@feature/templates';
import { FormBuilder, Validators } from '@angular/forms';
import { TraderRESTService } from '@core/services/REST';
import { CONSTANTS } from '@core/util/constants';
import { TraderService } from '@core/services';

@Component({
  selector: 'ddx-kyc-phone-verification',
  templateUrl: './ddx-kyc-phone-verification.component.html',
  styleUrls: [
    '../../../public/ddx-kyc-pages.scss',
    './ddx-kyc-phone-verification.component.scss',
  ],
})
export class KYCPhoneVerificationPageComponent extends KYCPageDirective
  implements OnInit {
  private hasSubmittedMobileNumber: boolean;

  @ViewChild('submitNumberButton')
  submitNumberButton: ElementRef;

  constructor(
    protected router: Router,
    protected el: ElementRef,
    protected renderer: Renderer2,
    protected formBuilder: FormBuilder,
    protected traderService: TraderService,
    private restService: TraderRESTService
  ) {
    super(router, el, renderer, formBuilder, traderService);
    this.renderer.addClass(this.el.nativeElement, 'kyc-form');
    this.hasSubmittedMobileNumber = false;
  }

  ngOnInit() {
    const trader = this.currentTrader;

    this.kycForm = this.formBuilder.group({
      countryTelephoneCode: [
        trader.mobileNumber ? trader.mobileNumber.countryTelephoneCode : '',
        Validators.required,
      ],
      mobileNumber: [
        trader.mobileNumber ? trader.mobileNumber.mobileNumber : '',
        Validators.required,
      ],
      code: [
        trader.mobileNumber ? trader.mobileNumber.code : '',
        [
          Validators.required,
          Validators.minLength(CONSTANTS.PHONE_VERIFICATION_CODE_LENGTH),
          Validators.maxLength(CONSTANTS.PHONE_VERIFICATION_CODE_LENGTH),
        ],
      ],
    });
  }

  get hasSubmittedNumber(): boolean {
    return this.hasSubmittedMobileNumber;
  }

  onSubmitNumber(): void {
    this.renderer.addClass(this.submitNumberButton.nativeElement, 'is-loading');

    const { code, ...dataToSend } = this.kycForm.value;

    this.restService.requestSendConfirmationMobileNumber(dataToSend).subscribe(
      response => {
        this.renderer.removeClass(
          this.submitNumberButton.nativeElement,
          'is-loading'
        );
        this.hasSubmittedMobileNumber = true;
      },
      errorResponse => {
        this.renderer.removeClass(
          this.submitNumberButton.nativeElement,
          'is-loading'
        );
      }
    );
  }

  onSubmit(): void {
    this.setLoadingOn();

    const dataToSend = this.kycForm.value;

    this.restService.requestUpdateMobileNumber(dataToSend).subscribe(
      response => {
        this.setLoadingOff();
        this.router.navigateByUrl('/user/kyc/identity-proof');
      },
      errorResponse => {
        this.setLoadingOff();
      }
    );
  }
}
