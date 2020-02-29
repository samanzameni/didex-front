import { NgModule } from '@angular/core';
import {
  AuthRESTService,
  TraderRESTService,
  PublicRESTService,
  TradingRESTService,
} from '@core/services/REST';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    AuthRESTService,
    TraderRESTService,
    PublicRESTService,
    TradingRESTService,
  ],
})
export class RESTModule {}
