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
  DropdownAutocompleteComponent,
  DropdownMenuComponent,
  DropdownSelectComponent,
  ToggleButtonComponent,
  CheckboxComponent,
  RadioButtonComponent,
  RadioGroupComponent,
  TradingViewChartWrapperComponent,
  ImageUploaderComponent,
  ProButtonComponent,
  DropdownAutocompleteCountriesComponent,
  ExternalUrlRedirectorComponent,
} from './components';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    ArrangeCenterDirective,
    ArrangeInlineDirective,
    ArrangeInlineWrapDirective,
    ArrangeStackDirective,
    //
    DropdownAutocompleteComponent,
    DropdownAutocompleteCountriesComponent,
    DropdownMenuComponent,
    DropdownSelectComponent,
    ToggleButtonComponent,
    ProButtonComponent,
    CheckboxComponent,
    RadioButtonComponent,
    RadioGroupComponent,
    ImageUploaderComponent,
    //
    TradingViewChartWrapperComponent,
    ExternalUrlRedirectorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    //
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    ArrangeCenterDirective,
    ArrangeInlineDirective,
    ArrangeInlineWrapDirective,
    ArrangeStackDirective,
    //
    DropdownAutocompleteComponent,
    DropdownAutocompleteCountriesComponent,
    DropdownMenuComponent,
    DropdownSelectComponent,
    ToggleButtonComponent,
    ProButtonComponent,
    CheckboxComponent,
    RadioButtonComponent,
    RadioGroupComponent,
    ImageUploaderComponent,
    //
    TradingViewChartWrapperComponent,
    ExternalUrlRedirectorComponent,
  ],
})
export class WidgetModule {}
