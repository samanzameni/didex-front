import { Component, OnInit } from '@angular/core';
import { StorageService } from '@core/services';

@Component({
  selector: 'ddx-main',
  templateUrl: './ddx-main.component.html',
  styleUrls: ['./ddx-main.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  private isUserAuthorized: boolean;
  constructor(private storageService: StorageService) {
    this.isUserAuthorized = !!this.storageService.getUserAccessToken();
  }

  ngOnInit() {}

  get isAuthorized(): boolean {
    return this.isUserAuthorized;
  }
}
