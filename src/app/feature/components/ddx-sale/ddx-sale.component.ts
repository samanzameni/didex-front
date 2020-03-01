import { Component, OnInit, Input } from '@angular/core';
import { TradeSymbol } from '@core/models';

@Component({
  selector: 'ddx-sale',
  templateUrl: './ddx-sale.component.html',
  styleUrls: [
    '../../public/ddx-homepage-tables.scss',
    './ddx-sale.component.scss',
  ],
})
export class SaleComponent implements OnInit {
  @Input() activeSymbol: TradeSymbol;

  constructor() {}

  ngOnInit(): void {}
}
