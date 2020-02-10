import { Component, OnInit } from '@angular/core';
import { DropdownMenuItem } from '@widget/models';

@Component({
  selector: 'ddx-navbar',
  templateUrl: './ddx-navbar.component.html',
  styleUrls: ['./ddx-navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private accountDropdownItems: DropdownMenuItem[];

  constructor() {
    this.initMenuItems();
  }

  ngOnInit() {}

  initMenuItems(): void {
    this.accountDropdownItems = [
      { caption: 'Sign in', url: '/auth/signin' },
      { caption: 'Sign up', url: '/auth/signup' },
      { caption: 'Settings', url: '/user/settings' },
    ];
  }

  get accountItems(): DropdownMenuItem[] {
    return this.accountDropdownItems;
  }
}
