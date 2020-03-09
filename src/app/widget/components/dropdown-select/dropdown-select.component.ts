import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { DataEntryDirective } from '@widget/templates';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import {
  IconDefinition,
  faAngleUp,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { DropdownSelectItem } from '@widget/models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'dropdown-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss'],
})
export class DropdownSelectComponent extends DataEntryDirective<string>
  implements OnInit, AfterViewInit {
  @Input() hasMultiselect: boolean;
  @Input() hasDefaultValue: boolean;

  @Input() items: DropdownSelectItem[];
  @Input() caption: string;
  @Input() control: FormControl;

  private isOpenState: boolean;
  private selectedTitle: string;

  @ViewChildren(CheckboxComponent) checkboxes: QueryList<CheckboxComponent>;

  constructor(private cdRef: ChangeDetectorRef) {
    super();
    this.isOpenState = false;
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (!this.items) {
      this.items = [];
    }

    if (!this.caption) {
      this.caption = 'Choose ...';
    }

    if (this.hasDefaultValue && this.items.length > 0) {
      this.setValue(this.items[0], 0);
    }

    if (this.control && this.control.value) {
      for (const item of this.items) {
        if (item.value === this.control.value) {
          const index = this.items.indexOf(item);
          this.setValue(this.control.value, index);
          break;
        }
      }
    }
  }

  ngAfterViewInit(): void {
    this.cdRef.detach();
  }

  get isValid(): boolean {
    return !(this.isRequired && (!this.value || this.value.length < 1));
  }

  get isOpen(): boolean {
    return this.isOpenState;
  }

  get caretIcon(): IconDefinition {
    return this.isOpen ? faAngleUp : faAngleDown;
  }

  get selected(): string {
    return this.selectedTitle || '';
  }

  toggleDropdown(): void {
    this.isOpenState = !this.isOpenState;
    this.cdRef.detectChanges();
  }

  setValue($event, index: number): void {
    const selectedValue = this.items[index].value;
    this.selectedTitle = this.items[index].title;

    if (this.hasMultiselect) {
      if (!this.data || this.data.length < 1) {
        this.data = selectedValue;
        if (this.checkboxes) {
          this.checkboxes.toArray()[index].setState(true);
        }
      } else {
        if (this.data.indexOf(selectedValue) >= 0) {
          // Already selected
          // Removing the value from selected ones
          this.data = this.data
            .split(',')
            .filter(v => v !== selectedValue)
            .join(',');

          if (this.checkboxes) {
            this.checkboxes.toArray()[index].setState(false);
          }
        } else {
          this.data = `${this.data},${selectedValue}`;
          if (this.checkboxes) {
            this.checkboxes.toArray()[index].setState(true);
          }
        }
      }
    } else {
      this.data = selectedValue;
      this.isOpenState = false;
    }

    this.cdRef.detectChanges();
    this.valueChange.emit(this.value);
    if (this.control) {
      this.control.setValue(this.value);
    }
  }
}
