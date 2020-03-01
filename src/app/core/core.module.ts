import { NgModule } from '@angular/core';
import { RESTModule } from './modules/ddx-rest.module';
import { DATAModule } from './modules/ddx-data.module';
import {
  StorageService,
  AuthService,
  SignalRService,
  TraderService,
} from './services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [HttpClientModule, DATAModule, RESTModule],
  providers: [StorageService, AuthService, SignalRService, TraderService],
})
export class CoreModule {}
