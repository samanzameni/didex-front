import {
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Directive,
} from '@angular/core';

@Directive()
export abstract class DataEntryDirective<T> implements OnInit, OnDestroy {
  @Input() label: string;
  @Input() isRequired: boolean;

  protected data: T;

  valueChange: EventEmitter<T>;

  constructor() {
    this.valueChange = new EventEmitter();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  get value(): T {
    return this.data;
  }

  abstract get isValid(): boolean;
}
