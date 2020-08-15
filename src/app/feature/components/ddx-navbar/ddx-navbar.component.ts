import { Component, OnInit } from '@angular/core';
import { DropdownMenuItem } from '@widget/models';
import { AuthService, TraderService } from '@core/services';
import {
  LocaleService,
  LocaleModel,
  Locale,
} from '@core/services/ddx-locale.service';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'ddx-navbar',
  templateUrl: './ddx-navbar.component.html',
  styleUrls: ['./ddx-navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isHamburgerMenuClicked: boolean;

  constructor(
    private authService: AuthService,
    private traderService: TraderService,
    private localeService: LocaleService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'product',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/icon-desktop-menu.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'profile',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icon-account.svg')
    );
    iconRegistry.addSvgIcon(
      'account',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icon-account.svg')
    );
    iconRegistry.addSvgIcon(
      'locale-selector',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/icon-locale-selector.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'log-out',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icon-log-out.svg')
    );
  }

  ngOnInit() {}

  get isAuthorized(): boolean {
    return this.authService.isAuthorized;
  }

  get traderEmail(): string {
    return this.authService.decodedToken?.email || '';
  }

  requestSignOut(): void {
    this.authService.requestSignOut();
  }

  handleLocaleChange($event: Locale): void {
    this.localeService.changeLocale($event);
    window.location.reload();
  }

  get personalInfo(): string {
    return (
      this.traderService?.currentTrader?.personalInformation?.firstName ||
      'Trader'
    );
  }

  get availableLocales(): LocaleModel[] {
    return this.localeService.availableLocales;
  }

  get currentLocaleModel(): LocaleModel {
    return this.localeService.currentLocaleModel;
  }

  toggleMenu(): void {
    this.isHamburgerMenuClicked = !this.isHamburgerMenuClicked;
  }
}
