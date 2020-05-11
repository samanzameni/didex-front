import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalUrlRedirectorComponent } from './external-url-redirector.component';

describe('ExternalUrlRedirectorComponent', () => {
  let component: ExternalUrlRedirectorComponent;
  let fixture: ComponentFixture<ExternalUrlRedirectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalUrlRedirectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalUrlRedirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
