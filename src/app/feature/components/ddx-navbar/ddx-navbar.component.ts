import { Component, OnInit } from '@angular/core';
import { DropdownMenuItem } from '@widget/models';

@Component({
  selector: 'ddx-navbar',
  templateUrl: './ddx-navbar.component.html',
  styleUrls: ['./ddx-navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private myAccountDropdownItems: DropdownMenuItem[];

  constructor() {
    this.initMenuItems();
  }

  ngOnInit() {}

  initMenuItems(): void {
    this.myAccountDropdownItems = [
      { caption: 'Sign in', url: '/auth/signin' },
      { caption: 'Sign up', url: '/auth/signup' },
    ];
  }

  get myAccountItems(): DropdownMenuItem[] {
    return this.myAccountDropdownItems;
  }
}
