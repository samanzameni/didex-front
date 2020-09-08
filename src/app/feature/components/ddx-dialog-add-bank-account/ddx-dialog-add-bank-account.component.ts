import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BankAccount } from '@core/models';
import { BankAccountRESTService } from '@core/services/REST';

@Component({
  selector: 'ddx-dialog-add-bank-account',
  templateUrl: './ddx-dialog-add-bank-account.component.html',
  styleUrls: ['./ddx-dialog-add-bank-account.component.scss'],
})
export class DialogAddBankAccountComponent {
  public cardNumber: string;
  public iban: string;

  public cardNumberFormGroup: FormGroup;
  private formErrors: any;

  constructor(
    public dialogRef: MatDialogRef<DialogAddBankAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bankAccountService: BankAccountRESTService,
    private formBuilder: FormBuilder
  ) {
    this.formErrors = {};
  }

  private buildFormGroup(): void {
    this.cardNumberFormGroup = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.minLength(16)]],
      iban: ['', [Validators.required, Validators.minLength(26)]],
    });
  }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  get errors(): any {
    return this.formErrors;
  }

  handleCancel(): void {
    this.dialogRef.close();
  }

  handleAssign(): void {
    const dataToSend: BankAccount.AddFormData = {
      cardNumber: this.cardNumber,
      iban: this.iban,
      currencyShortName: this.data.currencyShortName,
    };

    this.bankAccountService.requestAddBankAccount(dataToSend).subscribe(
      (response) => {
        this.dialogRef.close(response);
      },
      (errorResponse) => {
        if (errorResponse.status === 400) {
          const errors = errorResponse.error.errors;

          if (errors.CardNumber) {
            this.formErrors.cardNumber = errors.CardNumber;
          }

          if (errors.Iban) {
            this.formErrors.iban = errors.Iban;
          }
        }
      }
    );
  }
}
