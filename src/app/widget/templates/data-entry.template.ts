import { OnInit, OnDestroy, Input, EventEmitter } from '@angular/core';

export abstract class DataEntry<T> implements OnInit, OnDestroy {
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
