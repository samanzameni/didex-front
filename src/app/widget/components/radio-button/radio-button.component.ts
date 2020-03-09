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
  @Input() value: any;
  @Input() label: string;

  @Input() isForceChecked: boolean; // TODO: WTF?

  private isCheckedState: boolean;

  @Output() valueChange: EventEmitter<any>;

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
    return this.isForceChecked || this.isCheckedState;
  }

  onPush($event): void {
    this.isCheckedState = $event.target.checked;

    if (this.isChecked) {
      this.valueChange.emit($event.target.value);
    }
  }

  forceSelect(): void {
    this.isCheckedState = true;
    if (this.buttonElement) {
      this.buttonElement.nativeElement.checked = true;
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
