import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteBankAccountComponent } from './ddx-dialog-delete-bank-account.component';

describe('DialogDeleteBankAccountComponent', () => {
  let component: DialogDeleteBankAccountComponent;
  let fixture: ComponentFixture<DialogDeleteBankAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDeleteBankAccountComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
