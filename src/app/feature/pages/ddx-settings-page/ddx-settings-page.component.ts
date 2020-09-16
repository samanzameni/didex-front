import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { DropdownSelectItem } from '@widget/models';
import { TIMEZONES } from '@core/util/constants';
import { mustMatch, isStrong } from '@core/util/validators';
import { TraderService, DirectionService } from '@core/services';
import { Trader } from '@core/models';
import { TraderRESTService, AuthRESTService } from '@core/services/REST';
import { ProButtonComponent } from '@widget/components';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'ddx-settings-page',
  templateUrl: './ddx-settings-page.component.html',
  styleUrls: ['./ddx-settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit {
  private activePage: string;
  private timezonesMapped: DropdownSelectItem[];

  private generalReactiveFormGroup: FormGroup;
  private securityReactiveFormGroup: FormGroup;
  private isPasswordHidden: boolean;
  private formErrors: any;
  public arePasswordHintsHidden: boolean = false;

  @ViewChild('generalSubmitButton') generalSubmitButton: ProButtonComponent;
  @ViewChild('securitySubmitButton') securitySubmitButton: ProButtonComponent;
  @ViewChild('securityForm') private securityFormDirective: NgForm;

  constructor(
    private formBuilder: FormBuilder,
    private traderService: TraderService,
    private restService: TraderRESTService,
    private authRestService: AuthRESTService,
    private route: ActivatedRoute,
    private snackbarService: MatSnackBar,
    private directionService: DirectionService,
    private cdref: ChangeDetectorRef
  ) {
    this.isPasswordHidden = true;
    this.activePage = 'general';
    this.timezonesMapped = TIMEZONES.map((timezone) => {
      return {
        title: timezone.text,
        value: timezone.text,
      } as DropdownSelectItem;
    });

    this.activePage = 'general';
    if (this.route.queryParams) {
      this.route.queryParams.subscribe((params) => {
        this.activePage = params.tab || 'general';
      });
    }

    this.formErrors = {};
  }

  private buildSecurityForm(): void {
    this.securityReactiveFormGroup = this.formBuilder.group(
      {
        currentPassword: ['', [Validators.required, Validators.minLength(8)]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [
          mustMatch('newPassword', 'confirmPassword'),
          isStrong('newPassword'),
        ],
      }
    );
  }

  private resetSecurityForm(): void {
    if (this.securityReactiveFormGroup) {
      this.securityReactiveFormGroup.markAsPristine();
      this.securityReactiveFormGroup.markAsUntouched();
      this.securityReactiveFormGroup.reset({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }

    if (this.securityFormDirective) {
      this.securityFormDirective.resetForm();
    }

    this.cdref.detectChanges();
  }

  private buildGeneralForm(): void {
    const trader: any = this.traderService.currentTrader;

    this.generalReactiveFormGroup = this.formBuilder.group({
      nickname: [
        trader.generalInformation ? trader.generalInformation.nickName : '',
      ],
      timezone: [
        trader.generalInformation ? trader.generalInformation.timeZone : '',
      ],
    });
  }

  ngOnInit() {
    this.buildGeneralForm();
    this.buildSecurityForm();
  }

  get direction$(): Observable<string> {
    return this.directionService.direction$;
  }

  get currentActivePage(): string {
    return this.activePage;
  }

  get generalFormGroup(): FormGroup {
    return this.generalReactiveFormGroup;
  }

  get generalFormControls(): any {
    return this.generalFormGroup.controls;
  }

  get securityFormGroup(): FormGroup {
    return this.securityReactiveFormGroup;
  }

  get securityFormControls(): any {
    return this.securityReactiveFormGroup.controls;
  }

  get timezonesList(): DropdownSelectItem[] {
    return this.timezonesMapped;
  }

  get currentTrader(): Trader {
    return this.traderService.currentTrader;
  }

  get currentTraderStatus(): string {
    switch (true) {
      case this.traderService.isNewbie:
        return 'newbie';
      case this.traderService.hasSentKYC:
        return 'sent';
      case this.traderService.hasKYCApproved:
        return 'approved';
      case this.traderService.isBanned:
        return 'banned';
      case this.traderService.isRejected:
        return 'rejected';
      default:
        return 'newbie';
    }
  }

  get isHidden(): boolean {
    return this.isPasswordHidden;
  }

  get errors(): any {
    return this.formErrors;
  }

  get hasTraderEnabledTwoFactor(): boolean {
    return this.traderService.currentTrader.twoFactorEnabled;
  }

  toggleHidePassword(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  hidePasswordHints(): void {
    this.arePasswordHintsHidden = true;
  }

  activatePage(newPage: string): void {
    this.activePage = newPage;
  }

  onSubmitGeneralForm(): void {
    this.formErrors = {};
    if (this.generalSubmitButton) {
      this.generalSubmitButton.setLoadingOn();
    }
    this.restService
      .requestUpdateGeneralInformation(this.generalReactiveFormGroup.value)
      .subscribe(
        (response) => {
          if (this.generalSubmitButton) {
            this.generalSubmitButton.setLoadingOff();
          }

          this.snackbarService.open('Changes saved!', '', { duration: 1500 });
        },
        (errorResponse) => {
          if (this.generalSubmitButton) {
            this.generalSubmitButton.setLoadingOff();
          }
        }
      );
  }

  hasNumber(value: string): boolean {
    return /\d/.test(value);
  }
  hasUpper(value: string): boolean {
    return /[A-Z]/.test(value);
  }
  hasLower(value: string): boolean {
    return /[a-z]/.test(value);
  }
  hasSpecial(value: string): boolean {
    return /[-!#$%^&*()_+@|~=`{}\[\]:";'<>?,.\/\\]/.test(value);
  }
  isAtLeastEightCharacters(value: string): boolean {
    return value && value.length >= 8;
  }

  onSubmitSecurityForm(): void {
    this.formErrors = {};
    if (this.securitySubmitButton) {
      this.securitySubmitButton.setLoadingOn();
    }
    this.authRestService
      .requestChangePassword(this.securityReactiveFormGroup.value)
      .subscribe(
        (response) => {
          if (this.securitySubmitButton) {
            this.securitySubmitButton.setLoadingOff();
          }

          this.resetSecurityForm();
          this.hidePasswordHints();

          this.snackbarService.open('Changes saved!', '', { duration: 1500 });
        },
        (errorResponse) => {
          if (this.securitySubmitButton) {
            this.securitySubmitButton.setLoadingOff();
          }

          if (errorResponse.status === 400) {
            const errors = errorResponse.error.errors;

            if (errors.password) {
              this.formErrors.password = errors.password;
            }

            for (const key of Object.keys(errors)) {
              if (!['password', 'default'].includes(key)) {
                alert(`An error occured: There is something wrong with ${key}`);
              }
            }
          }
        }
      );
  }
}
