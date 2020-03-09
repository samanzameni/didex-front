import { NgModule } from '@angular/core';
import { RESTModule } from './ddx-rest.module';
import { DATAModule } from './ddx-data.module';
import { BalanceINTERVALService } from '@core/services/INTERVALS';

@NgModule({
  declarations: [],
  imports: [RESTModule, DATAModule],
  providers: [BalanceINTERVALService],
})
export class INTERVALModule {}
