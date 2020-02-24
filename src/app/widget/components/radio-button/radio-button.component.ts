import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent implements OnInit {
  @Input() value: string;
  @Input() label: string;

  private isCheckedState: boolean;

  @Output() valueChange: EventEmitter<string>;

  @ViewChild('buttonElement') buttonElement: ElementRef;

  constructor() {
    this.isCheckedState = false;
    this.valueChange = new EventEmitter();
  }

  ngOnInit() {}

  get isValid(): boolean {
    return true;
  }

  get isChecked(): boolean {
    return this.isCheckedState;
  }

  onPush($event): void {
    this.isCheckedState = $event.target.checked;

    if (this.isChecked) {
      this.valueChange.emit($event.target.value);
    }
  }

  clearSelect(): void {
    this.isCheckedState = false;
    if (this.buttonElement) {
      this.buttonElement.nativeElement.checked = false;
    }
    if (this.isChecked) {
      this.valueChange.emit(undefined);
    }
  }
}
