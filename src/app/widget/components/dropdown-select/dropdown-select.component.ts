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

@Component({
  selector: 'dropdown-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss'],
})
export class DropdownSelectComponent implements OnInit, AfterViewInit {
  @Input() hasMultiselect: boolean;
  @Input() hasDefaultValue: boolean;
  @Input() isRequired: boolean;

  @Input() items: string[];
  @Input() caption: string;

  private currentValue: string;
  private isOpenState: boolean;

  @Output() valueChange: EventEmitter<string>;

  constructor(private cdRef: ChangeDetectorRef) {
    this.valueChange = new EventEmitter();
    this.isOpenState = false;
  }

  ngOnInit(): void {
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

  get value(): string {
    return this.currentValue;
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
      if (!this.currentValue || this.currentValue.length < 1) {
        this.currentValue = selectedValue;
      } else {
        this.currentValue = `${this.currentValue},${selectedValue}`;
      }
    } else {
      this.currentValue = selectedValue;
      this.isOpenState = false;
    }

    this.cdRef.detectChanges();
    this.valueChange.emit(this.value);
  }
}
