import { Component, OnInit } from '@angular/core';
import { COUNTRIES } from '@core/util/constants';
import { Router } from '@angular/router';
import { DropdownSelectItem } from '@widget/models';

@Component({
  selector: 'app-ddx-kyc-personal-info',
  templateUrl: './ddx-kyc-personal-info.component.html',
  styleUrls: [
    '../../../public/ddx-kyc-pages.scss',
    './ddx-kyc-personal-info.component.scss',
  ],
})
export class KYCPersonalInfoPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  get countriesList(): DropdownSelectItem[] {
    return COUNTRIES.map(country => {
      return { title: country.name, value: country.code } as DropdownSelectItem;
    });
  }

  onSubmit(): void {
    this.router.navigateByUrl('/user/kyc/phone-verification');
  }
}
