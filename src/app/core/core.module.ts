import { NgModule } from '@angular/core';
import { RESTModule } from './modules/ddx-rest.module';
import { DATAModule } from './modules/ddx-data.module';
import { INTERVALModule } from './modules/ddx-interval.module';
import { StorageService, AuthService, TraderService } from './services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [HttpClientModule, DATAModule, RESTModule, INTERVALModule],
  exports: [],
  providers: [StorageService, AuthService, TraderService],
})
export class CoreModule {}
