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
    private traderService: TraderService
  ) {
    this.activePage = 'general';
  }

  ngOnInit() {
    this.generalReactiveFormGroup = this.formBuilder.group({
      nickname: [''],
      timezone: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.securityReactiveFormGroup = this.formBuilder.group(
      {
        oldPassword: ['', [Validators.required, Validators.minLength(8)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: [
          mustMatch('password', 'confirmPassword'),
          isStrong('password'),
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

  onSubmitGeneralForm(): void {}

  onSubmitSecurityForm(): void {}
}
