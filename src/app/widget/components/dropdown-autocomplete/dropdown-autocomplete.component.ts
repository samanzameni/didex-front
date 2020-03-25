import { Component, OnInit, Input } from '@angular/core';
import { DataEntryDirective } from '@widget/templates';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'dropdown-autocomplete',
  templateUrl: './dropdown-autocomplete.component.html',
  styleUrls: ['./dropdown-autocomplete.component.scss'],
})
export class DropdownAutocompleteComponent extends DataEntryDirective<string>
  implements OnInit {
  @Input() caption: string;
  @Input() control: FormControl;
  @Input() items: string[];

  filteredOptions: Observable<string[]>;

  constructor() {
    super();

    this.items = [];
  }

  ngOnInit(): void {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    if (!this.caption) {
      this.caption = 'Choose ...';
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.items.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  get isValid(): boolean {
    return !!this.data && this.data.length > 0;
  }
}
