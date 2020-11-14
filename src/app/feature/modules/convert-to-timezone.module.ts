import { NgModule } from '@angular/core';
import { ConvertToTimezonePipe } from '@feature/pipes/ddx-convert-to-timezone.pipe';

@NgModule({
  declarations: [ConvertToTimezonePipe],
  exports: [ConvertToTimezonePipe],
  providers: [ConvertToTimezonePipe],
})
export class ConvertToTimezonePipeModule {}
