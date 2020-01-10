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
} from './components';

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
  ],
  imports: [CommonModule],
  exports: [
    ArrangeCenterDirective,
    ArrangeInlineDirective,
    ArrangeInlineWrapDirective,
    ArrangeStackDirective,
    //
    DropdownMenuComponent,
    DropdownSelectComponent,
    ToggleButtonComponent,
  ],
})
export class WidgetModule {}
