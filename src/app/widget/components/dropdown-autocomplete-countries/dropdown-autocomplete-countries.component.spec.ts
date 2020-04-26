import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownAutocompleteCountriesComponent } from './dropdown-autocomplete-countries.component';

describe('DropdownAutocompleteCountriesComponent', () => {
  let component: DropdownAutocompleteCountriesComponent;
  let fixture: ComponentFixture<DropdownAutocompleteCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownAutocompleteCountriesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownAutocompleteCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
