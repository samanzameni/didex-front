import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ArrangeCenterDirective,
  ArrangeInlineDirective,
  ArrangeInlineWrapDirective,
  ArrangeStackDirective,
} from './directives';
import {
  DropdownMenuComponent,
  DropdownSelectComponent,
  ToggleButtonComponent,
  CheckboxComponent,
  RadioButtonComponent,
  RadioGroupComponent,
  TradingViewChartWrapperComponent,
} from './components';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ArrangeCenterDirective,
    ArrangeInlineDirective,
    ArrangeInlineWrapDirective,
    ArrangeStackDirective,
    //
    DropdownMenuComponent,
    DropdownSelectComponent,
    ToggleButtonComponent,
    CheckboxComponent,
    RadioButtonComponent,
    RadioGroupComponent,
    //
    TradingViewChartWrapperComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ArrangeCenterDirective,
    ArrangeInlineDirective,
    ArrangeInlineWrapDirective,
    ArrangeStackDirective,
    //
    DropdownMenuComponent,
    DropdownSelectComponent,
    ToggleButtonComponent,
    CheckboxComponent,
    RadioButtonComponent,
    RadioGroupComponent,
    //
    TradingViewChartWrapperComponent,
  ],
})
export class WidgetModule {}
