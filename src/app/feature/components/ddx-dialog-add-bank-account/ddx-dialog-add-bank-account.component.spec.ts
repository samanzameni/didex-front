import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddBankAccountComponent } from './ddx-dialog-add-bank-account.component';

describe('DialogAddBankAccountComponent', () => {
  let component: DialogAddBankAccountComponent;
  let fixture: ComponentFixture<DialogAddBankAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddBankAccountComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
