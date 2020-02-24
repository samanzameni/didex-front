import { NgModule } from '@angular/core';
import { SymbolDATAService, BalanceDATAService } from '@core/services/DATA';
import { RESTModule } from './ddx-rest.module';

@NgModule({
  declarations: [],
  imports: [RESTModule],
  providers: [SymbolDATAService, BalanceDATAService],
})
export class DATAModule {}
