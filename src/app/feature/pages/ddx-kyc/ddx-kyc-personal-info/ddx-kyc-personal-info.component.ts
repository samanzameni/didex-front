import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { COUNTRIES } from '@core/util/constants';
import { Router } from '@angular/router';
import { DropdownSelectItem } from '@widget/models';
import { FormBuilder, Validators } from '@angular/forms';
import { KYCPage } from '@feature/templates';
import { TraderRESTService } from '@core/services/REST';

@Component({
  selector: 'ddx-kyc-personal-info',
  templateUrl: './ddx-kyc-personal-info.component.html',
  styleUrls: [
    '../../../public/ddx-kyc-pages.scss',
    './ddx-kyc-personal-info.component.scss',
  ],
})
export class KYCPersonalInfoPageComponent extends KYCPage implements OnInit {
  constructor(
    protected router: Router,
    protected el: ElementRef,
    protected renderer: Renderer2,
    protected formBuilder: FormBuilder,
    private restService: TraderRESTService
  ) {
    super(router, el, renderer, formBuilder);
    this.renderer.addClass(this.el.nativeElement, 'kyc-form');
  }

  ngOnInit() {
    this.kycForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [
        '',
        [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
      ],
      birthCountryCode: ['', Validators.required],
      zipCode: ['', Validators.required],
      countryCode: ['', Validators.required],
      city: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
    });
  }

  get countriesList(): DropdownSelectItem[] {
    return COUNTRIES.map(country => {
      return { title: country.name, value: country.code } as DropdownSelectItem;
    });
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
