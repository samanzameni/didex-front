import { NgModule } from '@angular/core';
import { RESTModule } from './modules/ddx-rest.module';
import { StorageService } from './services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [RESTModule, HttpClientModule],
  providers: [StorageService],
})
export class CoreModule {}
