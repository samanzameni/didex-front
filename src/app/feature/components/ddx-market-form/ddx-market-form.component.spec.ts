import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketFormComponent } from './ddx-market-form.component';

describe('MarketFormComponent', () => {
  let component: MarketFormComponent;
  let fixture: ComponentFixture<MarketFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarketFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
