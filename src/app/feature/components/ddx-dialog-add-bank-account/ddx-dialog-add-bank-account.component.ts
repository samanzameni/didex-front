import { Component, Inject } from '@angular/core';
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

  constructor(
    public dialogRef: MatDialogRef<DialogAddBankAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bankAccountService: BankAccountRESTService
  ) {}

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
      (errorResponse) => {}
    );
  }
}