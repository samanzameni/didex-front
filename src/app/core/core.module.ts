import { NgModule } from '@angular/core';
import { RESTModule } from './modules/ddx-rest.module';
import { StorageService, AuthService } from './services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [RESTModule, HttpClientModule],
  providers: [StorageService, AuthService],
})
export class CoreModule {}
