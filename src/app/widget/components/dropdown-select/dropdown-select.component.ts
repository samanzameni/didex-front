import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { DataEntry } from '@widget/templates';

@Component({
  selector: 'dropdown-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss'],
})
export class DropdownSelectComponent extends DataEntry<string>
  implements OnInit, AfterViewInit {
  @Input() hasMultiselect: boolean;
  @Input() hasDefaultValue: boolean;

  @Input() items: string[];
  @Input() caption: string;

  private isOpenState: boolean;

  constructor(private cdRef: ChangeDetectorRef) {
    super();
    this.valueChange = new EventEmitter();
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

  toggleDropdown(): void {
    this.isOpenState = !this.isOpenState;
    this.cdRef.detectChanges();
  }

  setValue($event, index: number): void {
    const selectedValue = this.items[index];

    // TODO: remove value
    if (this.hasMultiselect) {
      if (!this.data || this.data.length < 1) {
        this.data = selectedValue;
      } else {
        this.data = `${this.data},${selectedValue}`;
      }
    } else {
      this.data = selectedValue;
      this.isOpenState = false;
    }

    this.cdRef.detectChanges();
    this.valueChange.emit(this.value);
  }
}
