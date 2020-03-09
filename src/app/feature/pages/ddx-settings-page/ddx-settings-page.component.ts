import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { DropdownSelectItem } from '@widget/models';
import { TIMEZONES } from '@core/util/constants';
import { mustMatch, isStrong } from '@core/util/validators';
import { TraderService } from '@core/services';
import { Trader } from '@core/models';
import { TraderRESTService, AuthRESTService } from '@core/services/REST';

@Component({
  selector: 'ddx-settings-page',
  templateUrl: './ddx-settings-page.component.html',
  styleUrls: ['./ddx-settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit {
  private activePage: string;

  private generalReactiveFormGroup: FormGroup;
  private securityReactiveFormGroup: FormGroup;

  @ViewChild('generalSubmitButton') generalSubmitButton: ElementRef;
  @ViewChild('securitySubmitButton') securitySubmitButton: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private traderService: TraderService,
    private restService: TraderRESTService,
    private authRestService: AuthRESTService
  ) {
    this.activePage = 'general';
  }

  ngOnInit() {
    const trader: any = this.traderService.currentTrader;

    this.generalReactiveFormGroup = this.formBuilder.group({
      nickname: [
        trader.generalInformation ? trader.generalInformation.nickName : '',
      ],
      timezone: [
        trader.generalInformation ? trader.generalInformation.timeZone : '',
      ],
    });

    this.securityReactiveFormGroup = this.formBuilder.group(
      {
        currentPassword: ['', [Validators.required, Validators.minLength(8)]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: [
          mustMatch('newPassword', 'confirmPassword'),
          isStrong('newPassword'),
        ],
      }
    );
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
    return TIMEZONES.map(timezone => {
      return {
        title: timezone.text,
        value: timezone.text,
      } as DropdownSelectItem;
    });
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
      default:
        return 'newbie';
    }
  }

  activatePage(newPage: string): void {
    this.activePage = newPage;
  }

  onSubmitGeneralForm(): void {
    if (this.generalSubmitButton) {
      this.renderer.addClass(
        this.generalSubmitButton.nativeElement,
        'is-loading'
      );
    }
    this.restService
      .requestUpdateGeneralInformation(this.generalReactiveFormGroup.value)
      .subscribe(
        response => {
          if (this.generalSubmitButton) {
            this.renderer.removeClass(
              this.generalSubmitButton.nativeElement,
              'is-loading'
            );
          }
        },
        errorResponse => {
          if (this.generalSubmitButton) {
            this.renderer.removeClass(
              this.generalSubmitButton.nativeElement,
              'is-loading'
            );
          }
        }
      );
  }

  onSubmitSecurityForm(): void {
    if (this.securitySubmitButton) {
      this.renderer.addClass(
        this.securitySubmitButton.nativeElement,
        'is-loading'
      );
    }
    this.authRestService
      .requestChangePassword(this.securityReactiveFormGroup.value)
      .subscribe(
        response => {
          if (this.securitySubmitButton) {
            this.renderer.removeClass(
              this.securitySubmitButton.nativeElement,
              'is-loading'
            );
          }
        },
        errorResponse => {
          if (this.securitySubmitButton) {
            this.renderer.removeClass(
              this.securitySubmitButton.nativeElement,
              'is-loading'
            );
          }
        }
      );
  }
}
