import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleComponent } from './ddx-sale.component';

describe('DdxSaleComponent', () => {
  let component: SaleComponent;
  let fixture: ComponentFixture<SaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SaleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
