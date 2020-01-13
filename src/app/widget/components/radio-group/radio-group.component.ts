import { Component, OnInit } from '@angular/core';
import { DataEntry } from '@widget/templates';

@Component({
  selector: 'radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
})
export class RadioGroupComponent extends DataEntry<string> implements OnInit {
  constructor() {
    super();
  } // TODO template

  ngOnInit() {}

  get isValid(): boolean {
    return this.isRequired && this.data !== undefined;
  }
}
