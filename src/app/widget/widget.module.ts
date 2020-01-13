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
  ],
})
export class WidgetModule {}
