import { Component, OnInit, Inject } from '@angular/core';
import { BankAccountRESTService } from '@core/services/REST';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BankAccount } from '@core/models';

@Component({
  selector: 'app-ddx-dialog-delete-bank-account',
  templateUrl: './ddx-dialog-delete-bank-account.component.html',
  styleUrls: ['./ddx-dialog-delete-bank-account.component.scss'],
})
export class DialogDeleteBankAccountComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteBankAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BankAccount.Model,
    private bankAccountService: BankAccountRESTService
  ) {}

  ngOnInit(): void {}

  deleteBankAccount() {
    const dataToSend: BankAccount.DeleteFormData = {
      id: this.data.id,
    };

    this.bankAccountService.requestDeleteBankAccount(dataToSend).subscribe(
      (response) => {
        this.dialogRef.close(response);
      },
      (errorResponse) => {
        //TODO
      }
    );
  }
}
