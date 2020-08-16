import { Component, OnInit, HostListener } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

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
  public isHamburgerMenuClicked: boolean = false;
  public innerWidth: any;

  constructor(
    private authService: AuthService,
    private traderService: TraderService,
    private localeService: LocaleService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public breakpointObserver: BreakpointObserver
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
    this.isHamburgerMenuClicked = false;
  }

  handleLocaleChange($event: Locale): void {
    this.localeService.changeLocale($event);
    window.location.reload();
  }

  onLocaleSelection(selectedLanguage: Locale): void {
    this.localeService.changeLocale(selectedLanguage);
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

  @HostListener('window:resize', ['$event'])
  onresize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 640) {
      this.isHamburgerMenuClicked = false;
    }
  }
}
