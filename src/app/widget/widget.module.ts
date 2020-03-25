import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  ArrangeCenterDirective,
  ArrangeInlineDirective,
  ArrangeInlineWrapDirective,
  ArrangeStackDirective,
} from './directives';
import {
  DropdownMenuComponent,
  DropdownItemComponent,
  DropdownSelectComponent,
  ToggleButtonComponent,
  CheckboxComponent,
  RadioButtonComponent,
  RadioGroupComponent,
  TradingViewChartWrapperComponent,
  ImageUploaderComponent,
} from './components';
import { RouterModule } from '@angular/router';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ArrangeCenterDirective,
    ArrangeInlineDirective,
    ArrangeInlineWrapDirective,
    ArrangeStackDirective,
    //
    DropdownMenuComponent,
    DropdownItemComponent,
    DropdownSelectComponent,
    ToggleButtonComponent,
    CheckboxComponent,
    RadioButtonComponent,
    RadioGroupComponent,
    ImageUploaderComponent,
    //
    TradingViewChartWrapperComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    //
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    ArrangeCenterDirective,
    ArrangeInlineDirective,
    ArrangeInlineWrapDirective,
    ArrangeStackDirective,
    //
    DropdownMenuComponent,
    DropdownItemComponent,
    DropdownSelectComponent,
    ToggleButtonComponent,
    CheckboxComponent,
    RadioButtonComponent,
    RadioGroupComponent,
    ImageUploaderComponent,
    //
    TradingViewChartWrapperComponent,
  ],
})
export class WidgetModule {}
