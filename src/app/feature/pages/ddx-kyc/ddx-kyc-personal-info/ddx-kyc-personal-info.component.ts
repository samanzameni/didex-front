import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { COUNTRIES } from '@core/util/constants';
import { Router } from '@angular/router';
import { DropdownSelectItem } from '@widget/models';
import { FormBuilder, Validators } from '@angular/forms';
import { KYCPageDirective } from '@feature/templates';
import { TraderRESTService } from '@core/services/REST';
import { TraderService } from '@core/services';

@Component({
  selector: 'ddx-kyc-personal-info',
  templateUrl: './ddx-kyc-personal-info.component.html',
  styleUrls: [
    '../../../public/ddx-kyc-pages.scss',
    './ddx-kyc-personal-info.component.scss',
  ],
})
export class KYCPersonalInfoPageComponent extends KYCPageDirective
  implements OnInit {
  private countries: DropdownSelectItem[];
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
    this.countries = COUNTRIES.map(country => {
      return {
        title: `${country.emoji} ${country.name}`,
        value: country.code,
      } as DropdownSelectItem;
    });
  }

  ngOnInit() {
    const trader = this.currentTrader;

    this.kycForm = this.formBuilder.group({
      firstName: [
        trader.personalInformation ? trader.personalInformation.firstName : '',
        [Validators.required, Validators.maxLength(50)],
      ],
      lastName: [
        trader.personalInformation ? trader.personalInformation.lastName : '',
        [Validators.required, Validators.maxLength(50)],
      ],
      dateOfBirth: [
        trader.personalInformation
          ? trader.personalInformation.dateOfBirth.substr(0, 10)
          : '',
        [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
      ],
      birthCountryCode: [
        trader.personalInformation
          ? trader.personalInformation.birthCountryCode
          : '',
        Validators.required,
      ],
      zipCode: [
        trader.personalInformation ? trader.personalInformation.zipCode : '',
        [Validators.required, Validators.maxLength(10)],
      ],
      countryCode: [
        trader.personalInformation
          ? trader.personalInformation.countryCode
          : '',
        Validators.required,
      ],
      city: [
        trader.personalInformation ? trader.personalInformation.city : '',
        [Validators.required, Validators.maxLength(50)],
      ],
      addressLine1: [
        trader.personalInformation
          ? trader.personalInformation.addressLine1
          : '',
        Validators.required,
      ],
      addressLine2: [
        trader.personalInformation
          ? trader.personalInformation.addressLine2
          : '',
      ],
    });
  }

  get countriesList(): DropdownSelectItem[] {
    return this.countries;
  }

  onSubmit(): void {
    this.setLoadingOn();
    const { dateOfBirth, ...formValue } = this.kycForm.value;
    const isoBirthdate = new Date(Date.parse(dateOfBirth)).toISOString();

    const dataToSend = Object.assign(formValue, { dateOfBirth: isoBirthdate });

    this.restService.requestUpdatePersonalInfo(dataToSend).subscribe(
      response => {
        this.setLoadingOff();
        this.router.navigateByUrl('/user/kyc/phone-verification');
      },
      errorResponse => {
        this.setLoadingOff();
      }
    );
  }
}
