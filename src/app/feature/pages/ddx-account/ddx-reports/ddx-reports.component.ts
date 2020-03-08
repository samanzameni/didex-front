import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ddx-reports',
  templateUrl: './ddx-reports.component.html',
  styleUrls: [
    '../../../public/ddx-account-pages.scss',
    './ddx-reports.component.scss',
  ],
})
export class ReportsPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  get tableRows() {
    return [1, 2, 3];
  }
}
