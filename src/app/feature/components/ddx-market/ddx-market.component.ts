import { Component, OnInit, Input } from '@angular/core';
import { TradeSymbol } from '@core/models';

@Component({
  selector: 'ddx-market',
  templateUrl: './ddx-market.component.html',
  styleUrls: ['./ddx-market.component.scss'],
})
export class MarketComponent implements OnInit {
  @Input() activeSymbol: TradeSymbol;

  private currentActiveType: string;

  constructor() {
    this.currentActiveType = 'market';
  }

  ngOnInit() {}

  get activeType(): string {
    return this.currentActiveType;
  }

  activateType(newType: string): void {
    this.currentActiveType = newType;
  }
  onSubmitBuy(): void {}
  onSubmitSell(): void {}
}
