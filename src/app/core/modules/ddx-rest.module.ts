import { NgModule } from '@angular/core';
import {
  AuthRESTService,
  TraderRESTService,
  PublicRESTService,
  TradingRESTService,
  OrderRESTService,
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
  ],
})
export class RESTModule {}
