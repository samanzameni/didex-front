import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetModule } from '@widget/widget.module';
import { MainModule } from '@feature/modules/main.module';
import { DdxWrongPageComponent } from './components/ddx-wrong-page/ddx-wrong-page.component';

@NgModule({
  imports: [CommonModule, WidgetModule, MainModule],
  declarations: [DdxWrongPageComponent],
})
export class FeatureModule {}
