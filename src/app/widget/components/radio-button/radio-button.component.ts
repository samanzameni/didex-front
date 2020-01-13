import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent implements OnInit {
  @Input() value: string;
  @Input() label: string;

  private isChecked: boolean;

  @Output() valueChange: EventEmitter<string>;

  constructor() {
    this.isChecked = false;
    this.valueChange = new EventEmitter();
  }

  ngOnInit() {}

  get isValid(): boolean {
    return true;
  }

  onPush($event): void {
    this.isChecked = $event.target.checked;

    if (this.isChecked) {
      this.valueChange.emit($event.target.value);
    }
  }
}
