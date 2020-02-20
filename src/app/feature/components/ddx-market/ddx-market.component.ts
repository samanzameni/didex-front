import { Component, OnInit, Input } from '@angular/core';
import { TradeSymbol } from '@core/models';

@Component({
  selector: 'ddx-market',
  templateUrl: './ddx-market.component.html',
  styleUrls: ['./ddx-market.component.scss'],
})
export class MarketComponent implements OnInit {
  @Input() activeSymbol: TradeSymbol;

  constructor() {}

  ngOnInit() {}
}
