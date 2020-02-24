import { NgModule } from '@angular/core';
import { SymbolDATAService } from '@core/services/DATA';
import { RESTModule } from './ddx-rest.module';

@NgModule({
  declarations: [],
  imports: [RESTModule],
  providers: [SymbolDATAService],
})
export class DATAModule {}
