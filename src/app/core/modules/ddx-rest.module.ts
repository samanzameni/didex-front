import { NgModule } from '@angular/core';
import {
  AuthRESTService,
  TraderRESTService,
  PublicRESTService,
  TradingRESTService,
  OrderRESTService,
  HistoryRESTService,
  BankingRESTService,
} from '@core/services/REST';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    AuthRESTService,
    TraderRESTService,
    PublicRESTService,
    TradingRESTService,
    OrderRESTService,
    HistoryRESTService,
    BankingRESTService,
  ],
})
export class RESTModule {}
