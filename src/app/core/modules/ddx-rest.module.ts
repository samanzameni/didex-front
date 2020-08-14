import { NgModule } from '@angular/core';
import {
  AuthRESTService,
  TraderRESTService,
  PublicRESTService,
  TradingRESTService,
  OrderRESTService,
  HistoryRESTService,
  BankingRESTService,
  GeneralRESTService,
  BankAccountRESTService,
} from '@core/services/REST';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    GeneralRESTService,
    AuthRESTService,
    TraderRESTService,
    PublicRESTService,
    TradingRESTService,
    OrderRESTService,
    HistoryRESTService,
    BankingRESTService,
    BankAccountRESTService,
  ],
})
export class RESTModule {}
