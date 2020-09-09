import { Component, OnInit, Input } from '@angular/core';
import { DataEntryDirective } from '@widget/templates';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { COUNTRIES, IRAN } from '@core/util/constants';
import { CountryData } from '@core/models';
import {
  AuthService,
  LocaleService,
  DirectionService,
  Direction,
} from '@core/services';

@Component({
  selector: 'dropdown-autocomplete-countries',
  templateUrl: './dropdown-autocomplete-countries.component.html',
  styleUrls: ['./dropdown-autocomplete-countries.component.scss'],
})
export class DropdownAutocompleteCountriesComponent
  extends DataEntryDirective<string>
  implements OnInit {
  @Input() caption: string;
  @Input() control: FormControl;
  @Input() desiredValueKey: string;

  private countriesList: CountryData[];

  filteredOptions: Observable<CountryData[]>;

  constructor(
    private authService: AuthService,
    private localeService: LocaleService,
    private directionService: DirectionService
  ) {
    super();

    if (localeService.isOnLocalhost()) {
      this.countriesList = [...IRAN, ...COUNTRIES];
      this.caption = 'Choose';
    } else if (!localeService.isOnRegionTwo()) {
      this.countriesList = IRAN;
      this.caption = 'انتخاب کشور';
    } else {
      this.countriesList = COUNTRIES;
      this.caption = 'Choose';
    }

    this.getTitleFromValue = this.getTitleFromValue.bind(this);
  }

  ngOnInit(): void {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map((selected) => this._filter(selected))
    );
  }

  private _filter(selected: string): CountryData[] {
    const filterValue = selected.toLowerCase();

    return this.countriesList.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  get direction$(): Observable<Direction> {
    return this.directionService.direction$;
  }

  get isValid(): boolean {
    return !!this.data && this.data.length > 0;
  }

  get isTraderInRegionTwo(): boolean {
    return this.authService.decodedToken?.region === '2';
  }

  getTitleFromValue(value: string): string {
    if (!this.countriesList || !value) {
      return '';
    }

    const result = this.countriesList.find(
      (item) => item[this.desiredValueKey] === value
    );
    if (!result) {
      return '';
    }

    return result.name;
  }
}
