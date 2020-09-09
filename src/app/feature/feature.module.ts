import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetModule } from '@widget/widget.module';
import { MainModule } from '@feature/modules/main.module';
import { DdxWrongPageComponent } from './components/ddx-wrong-page/ddx-wrong-page.component';
import { LocalePipeModule } from '@feature/modules/locale-pipe.module';

@NgModule({
  imports: [CommonModule, WidgetModule, MainModule, LocalePipeModule],
  declarations: [DdxWrongPageComponent],
})
export class FeatureModule {}
