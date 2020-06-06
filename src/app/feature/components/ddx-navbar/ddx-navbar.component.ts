import { Component, OnInit } from '@angular/core';
import { DropdownMenuItem } from '@widget/models';
import { AuthService, TraderService } from '@core/services';

@Component({
  selector: 'ddx-navbar',
  templateUrl: './ddx-navbar.component.html',
  styleUrls: ['./ddx-navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private traderService: TraderService
  ) {}

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

  get personalInfo(): string {
    return (
      this.traderService?.currentTrader?.personalInformation?.firstName ||
      'Trader'
    );
  }
}
