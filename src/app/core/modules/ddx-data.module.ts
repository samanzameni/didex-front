import { NgModule } from '@angular/core';
import {
  SymbolDATAService,
  BalanceDATAService,
  OrderBookDATAService,
  TickerDATAService,
  TradeDATAService,
  OrderDATAService,
  PrivateTradeDATAService,
  FilledOrderDATAService,
  TransactionsDATAService,
} from '@core/services/DATA';
import { RESTModule } from './ddx-rest.module';
import { SignalRService } from '@core/services';

@NgModule({
  declarations: [],
  imports: [RESTModule],
  providers: [
    SignalRService,
    SymbolDATAService,
    BalanceDATAService,
    OrderBookDATAService,
    TickerDATAService,
    TradeDATAService,
    OrderDATAService,
    PrivateTradeDATAService,
    FilledOrderDATAService,
    TransactionsDATAService,
  ],
})
export class DATAModule {}
