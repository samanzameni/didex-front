import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetModule } from '@widget/widget.module';
import { MainModule } from '@feature/modules/main.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, WidgetModule, MainModule],
})
export class FeatureModule {}
