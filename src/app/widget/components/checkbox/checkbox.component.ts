import { Component, OnInit } from '@angular/core';
import { DataEntry } from '@widget/templates';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent extends DataEntry<boolean> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}

  get isValid(): boolean {
    return true;
  }

  onCheck($event): void {
    this.data = $event.target.checked;
    this.valueChange.emit(this.value);
  }
}
