import { Component, OnInit } from '@angular/core';
import { DropdownMenuItem } from '@widget/models';
import { AuthService } from '@core/services';

@Component({
  selector: 'ddx-navbar',
  templateUrl: './ddx-navbar.component.html',
  styleUrls: ['./ddx-navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private accountDropdownItems: DropdownMenuItem[];

  constructor(private authService: AuthService) {
    this.initMenuItems();
  }

  ngOnInit() {}

  initMenuItems(): void {
    this.accountDropdownItems = [];
  }

  get accountItems(): DropdownMenuItem[] {
    return this.accountDropdownItems;
  }

  get isAuthorized(): boolean {
    return this.authService.isAuthorized;
  }

  requestSignOut(): void {
    this.authService.requestSignOut();
  }
}
