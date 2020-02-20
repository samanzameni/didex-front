import { NgModule } from '@angular/core';
import { RESTModule } from './modules/ddx-rest.module';
import { DATAModule } from './modules/ddx-data.module';
import { StorageService, AuthService } from './services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [RESTModule, HttpClientModule, DATAModule],
  providers: [StorageService, AuthService],
})
export class CoreModule {}
