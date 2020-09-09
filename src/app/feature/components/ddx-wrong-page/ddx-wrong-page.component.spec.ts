import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdxWrongPageComponent } from './ddx-wrong-page.component';

describe('DdxWrongPageComponent', () => {
  let component: DdxWrongPageComponent;
  let fixture: ComponentFixture<DdxWrongPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdxWrongPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdxWrongPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
