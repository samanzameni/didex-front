import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownAutocompleteComponent } from './dropdown-autocomplete.component';

describe('DropdownAutocompleteComponent', () => {
  let component: DropdownAutocompleteComponent;
  let fixture: ComponentFixture<DropdownAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
