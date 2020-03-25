import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { DataEntryDirective } from '@widget/templates';
import { DropdownSelectItem } from '@widget/models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss'],
})
export class DropdownSelectComponent extends DataEntryDirective<string>
  implements OnInit {
  @Input() hasMultiselect: boolean;
  @Input() hasDefaultValue: boolean;

  @Input() items: DropdownSelectItem[];
  @Input() caption: string;
  @Input() control: FormControl;

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (!this.items) {
      this.items = [];
    }

    if (!this.caption) {
      this.caption = 'Choose ...';
    }
  }

  get isValid(): boolean {
    return !(this.isRequired && (!this.value || this.value.length < 1));
  }
}
