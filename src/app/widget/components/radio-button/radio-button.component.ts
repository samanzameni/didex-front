import { Component, OnInit, Input } from '@angular/core';
import { DataEntry } from '@widget/templates';

@Component({
  selector: 'radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent extends DataEntry<string> implements OnInit {
  @Input() actualValue: string;

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  get isValid(): boolean {
    return true;
  }

  onPush($event): void {
    if ($event.target.checked) {
      this.data = $event.target.value;
      this.valueChange.emit(this.value);
    } else {
      this.data = undefined;
    }
  }
}
