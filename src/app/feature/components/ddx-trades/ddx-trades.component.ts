import { Component, OnInit, Input } from '@angular/core';
import { TradeSymbol } from '@core/models';

@Component({
  selector: 'ddx-trades',
  templateUrl: './ddx-trades.component.html',
  styleUrls: [
    '../../public/ddx-homepage-tables.scss',
    './ddx-trades.component.scss',
  ],
})
export class TradesComponent implements OnInit {
  @Input() activeSymbol: TradeSymbol;

  private currentActivePane: string;

  constructor() {
    this.currentActivePane = 'active';
  }

  ngOnInit(): void {}

  get activePane(): string {
    return this.currentActivePane;
  }

  activatePane(newPane: string): void {
    this.currentActivePane = newPane;
  }
}
