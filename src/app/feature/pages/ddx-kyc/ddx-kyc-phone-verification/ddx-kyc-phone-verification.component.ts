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
import { CONSTANTS, COUNTRIES } from '@core/util/constants';
import { TraderService } from '@core/services';
import { DropdownSelectItem } from '@widget/models';

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
  private formErrors: any;
  private countries: DropdownSelectItem[];

  @ViewChild('submitNumberButton')
  submitNumberButton: any;

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
    this.countries = COUNTRIES.map((country) => {
      return {
        title: `${country.emoji} ${country.name}`,
        value: country.phoneCode,
      };
    });
  }

  ngOnInit() {
    const trader = this.currentTrader;

    this.kycForm = this.formBuilder.group({
      countryTelephoneCode: [
        trader.mobileNumber ? trader.mobileNumber.countryTelephoneCode : '',
        [
          Validators.required,
          Validators.maxLength(4),
          Validators.pattern('[0-9]*'),
        ],
      ],
      mobileNumber: [
        trader.mobileNumber ? trader.mobileNumber.mobileNumber : '',
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern('[0-9]*'),
        ],
      ],
      code: [
        trader.mobileNumber ? trader.mobileNumber.code : '',
        [
          Validators.required,
          Validators.minLength(CONSTANTS.PHONE_VERIFICATION_CODE_LENGTH),
          Validators.maxLength(CONSTANTS.PHONE_VERIFICATION_CODE_LENGTH),
          Validators.pattern('[0-9]*'),
        ],
      ],
    });
  }

  get countriesList(): DropdownSelectItem[] {
    return this.countries;
  }

  get hasSubmittedNumber(): boolean {
    return this.hasSubmittedMobileNumber;
  }

  get errors(): any {
    return this.formErrors || {};
  }

  codeStartsWithDigit(value: string): boolean {
    return !!value.match(/^\d/);
  }

  onSubmitNumber(): void {
    const numbetButton =
      this.submitNumberButton.nativeElement ||
      this.submitNumberButton._elementRef.nativeElement;

    this.renderer.addClass(numbetButton, 'is-loading');

    const { code, ...dataToSend } = this.kycForm.value;

    this.restService.requestSendConfirmationMobileNumber(dataToSend).subscribe(
      (response) => {
        this.renderer.removeClass(numbetButton, 'is-loading');
        this.hasSubmittedMobileNumber = true;
      },
      (errorResponse) => {
        this.renderer.removeClass(numbetButton, 'is-loading');
      }
    );
  }

  onSubmit(): void {
    this.setLoadingOn();
    this.formErrors = {};

    const dataToSend = this.kycForm.value;

    this.restService.requestUpdateMobileNumber(dataToSend).subscribe(
      (response) => {
        this.setLoadingOff();
        this.router.navigateByUrl('/user/kyc/identity-proof');
      },
      (errorResponse) => {
        this.setLoadingOff();

        if (errorResponse.status === 400) {
          const errors = errorResponse.error.errors;

          if (errors.Code) {
            this.formErrors.code = errors.Code;
          }
        }
      }
    );
  }
}
