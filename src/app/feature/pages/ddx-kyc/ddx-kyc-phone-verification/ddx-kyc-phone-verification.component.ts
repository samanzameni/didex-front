import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { interval, timer, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { KYCPageDirective } from '@feature/templates';
import { FormBuilder, Validators } from '@angular/forms';
import { TraderRESTService } from '@core/services/REST';
import { CONSTANTS, COUNTRIES } from '@core/util/constants';
import { secondsToTime } from '@core/util/time';
import { TraderService, DirectionService, AuthService } from '@core/services';
import { DropdownSelectItem } from '@widget/models';

@Component({
  selector: 'ddx-kyc-phone-verification',
  templateUrl: './ddx-kyc-phone-verification.component.html',
  styleUrls: [
    '../../../public/ddx-kyc-pages.scss',
    './ddx-kyc-phone-verification.component.scss',
  ],
})
export class KYCPhoneVerificationPageComponent
  extends KYCPageDirective
  implements OnInit {
  private hasSubmittedMobileNumber: boolean;
  private formErrors: any;
  private countries: DropdownSelectItem[];
  public countdownTimer: string;
  public timerFinished: boolean = true;

  @ViewChild('submitNumberButton')
  submitNumberButton: any;

  constructor(
    protected router: Router,
    protected el: ElementRef,
    protected renderer: Renderer2,
    protected formBuilder: FormBuilder,
    protected traderService: TraderService,
    private restService: TraderRESTService,
    private directionService: DirectionService,
    private authService: AuthService
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
        trader.mobileNumber && this.isTraderInRegionTwo
          ? 98
          : trader.mobileNumber && !this.isTraderInRegionTwo
          ? trader.mobileNumber.countryTelephoneCode
          : '',
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

  get direction$(): Observable<string> {
    return this.directionService.direction$;
  }

  get countriesList(): DropdownSelectItem[] {
    return this.countries;
  }

  get isTraderInRegionTwo(): boolean {
    return this.authService.decodedToken?.region === '2';
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

  startCountdown(): void {
    this.timerFinished = false;
    const timerInterval$ = interval(1000); //1s
    const timer$ = timer(120000); //120s
    const times = 120;
    const countDown$ = timerInterval$.pipe(take(times));
    const sub = countDown$.subscribe((val) => {
      this.countdownTimer = secondsToTime(times - (val + 1));
    });
    const sub1 = timer$.subscribe((val) => {
      this.timerFinished = true;
    });
  }

  onSubmitNumber(): void {
    const numberButton =
      this.submitNumberButton.nativeElement ||
      this.submitNumberButton._elementRef.nativeElement;

    this.renderer.addClass(numberButton, 'is-loading');

    const { code, ...dataToSend } = this.kycForm.value;

    this.restService.requestSendConfirmationMobileNumber(dataToSend).subscribe(
      (response) => {
        this.hasSubmittedMobileNumber = true;
        this.renderer.removeClass(numberButton, 'is-loading');
        this.startCountdown();
      },
      (errorResponse) => {
        this.renderer.removeClass(numberButton, 'is-loading');
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

          if (errors.mobileNumber) {
            this.formErrors.mobileNumber = errors.mobileNumber;
          }

          if (errors.default) {
            this.formErrors.default = errors.default;
          }
        }
      }
    );
  }
}
