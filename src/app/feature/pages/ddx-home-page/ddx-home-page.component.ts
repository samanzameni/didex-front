import { Component, OnInit } from '@angular/core';
import { TradeSymbol } from '@core/models';

@Component({
  selector: 'ddx-home-page',
  templateUrl: './ddx-home-page.component.html',
  styleUrls: [
    './ddx-home-page.component.scss',
    './ddx-home-page-demo.component.scss',
  ],
})
export class HomePageComponent implements OnInit {
  private currentActiveSymbol: TradeSymbol;

  constructor() {}

  ngOnInit() {}

  handleSymbolChange(symbol: TradeSymbol): void {
    this.currentActiveSymbol = symbol;
  }

  get activeSymbol(): TradeSymbol {
    return this.currentActiveSymbol;
  }
}
