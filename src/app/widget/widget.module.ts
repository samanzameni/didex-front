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
  imports: [CommonModule, RouterModule, FontAwesomeModule],
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
