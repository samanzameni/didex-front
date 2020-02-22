import { NgModule } from '@angular/core';
import {
  AuthRESTService,
  TraderRESTService,
  PublicRESTService,
} from '@core/services/REST';

@NgModule({
  declarations: [],
  imports: [],
  providers: [AuthRESTService, TraderRESTService, PublicRESTService],
})
export class RESTModule {}
