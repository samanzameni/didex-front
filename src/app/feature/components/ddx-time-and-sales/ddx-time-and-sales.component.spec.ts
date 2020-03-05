import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeAndSalesComponent } from './ddx-time-and-sales.component';

describe('DdxSaleComponent', () => {
  let component: TimeAndSalesComponent;
  let fixture: ComponentFixture<TimeAndSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeAndSalesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAndSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
