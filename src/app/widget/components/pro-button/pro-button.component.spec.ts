import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProButtonComponent } from './pro-button.component';

describe('ProButtonComponent', () => {
  let component: ProButtonComponent;
  let fixture: ComponentFixture<ProButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
