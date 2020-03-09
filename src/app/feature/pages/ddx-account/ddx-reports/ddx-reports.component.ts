import { Component, OnInit } from '@angular/core';
import { Order, Trade } from '@core/models';
import { OrderDATAService, TradeDATAService } from '@core/services/DATA';

@Component({
  selector: 'ddx-reports',
  templateUrl: './ddx-reports.component.html',
  styleUrls: [
    '../../../public/ddx-account-pages.scss',
    './ddx-reports.component.scss',
  ],
})
export class ReportsPageComponent implements OnInit {
  private orders: Order[];
  private trades: Trade[];
  private transactions: any[];

  private currentActivePane: string;

  constructor(
    private orderDataService: OrderDATAService,
    private tradeDataService: TradeDATAService
  ) {
    this.currentActivePane = 'orders';
  }

  ngOnInit(): void {
    this.orderDataService.dataStream$.subscribe(data => {
      this.orders = data || [];
    });

    this.tradeDataService.dataStream$.subscribe(data => {
      this.trades = data || [];
    });
  }

  get tableRows() {
    return [1, 2, 3];
  }

  get orderData(): Order[] {
    return (this.orders || []).map(order => {
      order.createdAt = order.createdAt.replace('T', ' ').substr(0, 19);
      return order;
    });
  }

  get tradeData(): Trade[] {
    return (this.trades || []).map(trade => {
      trade.timeStamp = trade.timeStamp.replace('T', ' ').substr(0, 19);
      return trade;
    });
  }

  get activePane(): string {
    return this.currentActivePane;
  }

  activatePane(newPane: string): void {
    this.currentActivePane = newPane;
  }
}
