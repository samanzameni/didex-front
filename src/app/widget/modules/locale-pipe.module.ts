import { NgModule } from '@angular/core';
import { LocalePipe } from '@widget/pipes/ddx-locale.pipe';

@NgModule({
  declarations: [LocalePipe],
  exports: [LocalePipe],
  providers: [LocalePipe],
})
export class LocalePipeModule {}
