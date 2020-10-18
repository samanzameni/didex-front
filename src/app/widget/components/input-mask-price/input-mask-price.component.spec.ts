import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMaskPriceComponent } from './input-mask-price.component';

describe('InputMaskPriceComponent', () => {
  let component: InputMaskPriceComponent;
  let fixture: ComponentFixture<InputMaskPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputMaskPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputMaskPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
