import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TradeSymbol, Trade, OrderSide } from '@core/models';
import { AuthService } from '@core/services';

@Component({
  selector: 'ddx-time-and-sales',
  templateUrl: './ddx-time-and-sales.component.html',
  styleUrls: [
    '../../public/ddx-homepage-tables.scss',
    './ddx-time-and-sales.component.scss',
  ],
})
export class TimeAndSalesComponent implements OnInit {
  @Input() activeSymbol: TradeSymbol;
  @Input() tradeData: Trade[];

  @Output() loadNextPage: EventEmitter<any>;

  constructor(private authService: AuthService) {
    this.loadNextPage = new EventEmitter();
  }

  ngOnInit(): void {}

  getPriceCellCSSClass(row: Trade): string {
    return row.side === OrderSide.Buy ? 'green' : 'red';
  }

  get tableData(): Trade[] {
    return this.tradeData || [];
  }

  get isTraderInRegionTwo(): boolean {
    return this.authService.decodedToken?.region === '2';
  }

  onScroll(): void {
    this.loadNextPage.emit(null);
  }
}
