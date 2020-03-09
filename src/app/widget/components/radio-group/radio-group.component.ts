import {
  Component,
  OnInit,
  ContentChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { DataEntryDirective } from '@widget/templates';
import { RadioButtonComponent } from '../radio-button/radio-button.component';

@Component({
  selector: 'radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
})
export class RadioGroupComponent extends DataEntryDirective<any>
  implements OnInit, AfterViewInit {
  @ContentChildren(RadioButtonComponent) radioButtons: QueryList<
    RadioButtonComponent
  >;

  constructor() {
    super();
  }

  ngOnInit() {}

  get isValid(): boolean {
    return this.isRequired && this.data !== undefined;
  }

  ngAfterViewInit(): void {
    this.radioButtons.forEach(button => {
      button.valueChange.subscribe(value => {
        if (value !== undefined) {
          this.data = value;
          this.valueChange.emit(value);
          button.forceSelect();

          this.radioButtons.forEach(otherButton => {
            if (otherButton.value !== value) {
              otherButton.clearSelect();
            }
          });
        }
      });
    });
  }
}
