import { NgModule } from '@angular/core';
import { LocalePipe } from '@feature/pipes/ddx-locale.pipe';

@NgModule({
  declarations: [LocalePipe],
  exports: [LocalePipe],
})
export class LocalePipeModule {}
