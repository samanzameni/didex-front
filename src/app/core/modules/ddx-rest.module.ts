import { NgModule } from '@angular/core';
import {
  AuthRESTService,
  TraderRESTService,
  PublicRESTService,
  TradingRESTService,
  OrderRESTService,
  HistoryRESTService,
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
  ],
})
export class RESTModule {}
