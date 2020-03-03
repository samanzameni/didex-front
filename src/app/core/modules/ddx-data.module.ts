import { NgModule } from '@angular/core';
import {
  SymbolDATAService,
  BalanceDATAService,
  OrderDATAService,
} from '@core/services/DATA';
import { RESTModule } from './ddx-rest.module';

@NgModule({
  declarations: [],
  imports: [RESTModule],
  providers: [SymbolDATAService, BalanceDATAService, OrderDATAService],
})
export class DATAModule {}
