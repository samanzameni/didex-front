import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'input-mask-price',
  templateUrl: './input-mask-price.component.html',
  styleUrls: ['./input-mask-price.component.scss'],
  providers: [
    {provide: MatFormFieldControl, useExisting: InputMaskPriceComponent}
  ]
})
export class InputMaskPriceComponent implements OnInit, ControlValueAccessor, MatFormFieldControl<any>, OnDestroy {
  static nextId = 0;
  FormGrp: FormGroup;
  stateChanges = new Subject<void>();
  _value: string;
  _disabled: boolean;
  private _required = false;
  private _placeholder: string;
  onChange: (_: any) => {};
  onTouched: () => void;

  controlType = 'input-mask-price';

  @HostBinding() id = `input-mask-price-${InputMaskPriceComponent.nextId++}`;

  focused = false;

  errorState = false;

  @HostBinding('attr.aria-describedby') describedBy = '';



  constructor(@Optional() @Self() public ngControl: NgControl, fb: FormBuilder,
              private fm: FocusMonitor, private elRef: ElementRef<HTMLElement> ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
    this.FormGrp = fb.group({
      data: ['', this.required]
    });
  }

  get value() {
    return this._value;
  }

  set value(price: string | null) {
    this._value = price;
    this.stateChanges.next();
  }

  @Input() get placeholder() {
    return this._placeholder;
  }

  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  get empty() {
    return !this._value || this._value === '';
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input() get required() {
    return this._required;
  }

  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @Input() get disabled(): boolean { return this._disabled; }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  ngOnInit(): void {
  }

  writeValue(value: string): void {
  // .toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    this.FormGrp.get('data').setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  input() {
    this.value = this.FormGrp.get('data').value;

    this.onChange(this.value);
  }

}
