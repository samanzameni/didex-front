import { Component, OnInit, Input } from '@angular/core';
import { TradeSymbol } from '@core/models';
import { BalanceDATAService } from '@core/services/DATA';

@Component({
  selector: 'ddx-order-book',
  templateUrl: './ddx-order-book.component.html',
  styleUrls: [
    '../../public/ddx-homepage-tables.scss',
    './ddx-order-book.component.scss',
  ],
})
export class OrderBookComponent implements OnInit {
  @Input() activeSymbol: TradeSymbol;

  constructor(private dataService: BalanceDATAService) {}

  ngOnInit(): void {
    this.dataService.updateData();
    this.dataService.dataStream$.subscribe(data => {
      console.log(data);
    });
  }

  get tableData(): TradeSymbol[] {
    return this.activeSymbol ? [this.activeSymbol] : [];
  }
}
