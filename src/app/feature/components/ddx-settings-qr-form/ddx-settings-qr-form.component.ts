import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthRESTService } from '@core/services/REST';
import { TwoFactorQRData, TwoFactorData } from '@core/models';
import { ProButtonComponent } from '@widget/components';
import { MatDialog } from '@angular/material/dialog';
import { SettingsQrRecoveryPopupComponent } from '../ddx-settings-qr-recovery-popup/ddx-settings-qr-recovery-popup.component';
import { TraderService } from '@core/services';

@Component({
  selector: 'ddx-settings-qr-form',
  templateUrl: './ddx-settings-qr-form.component.html',
  styleUrls: ['./ddx-settings-qr-form.component.scss'],
})
export class SettingsQRFormComponent implements OnInit {
  private data: TwoFactorQRData;
  private isLoading: boolean;
  private formErrors: any;

  @Input() mode: 'add' | 'remove' = 'add';

  @ViewChild('enableSubmitButton') enableSubmitButton: ProButtonComponent;
  @ViewChild('disableSubmitButton') disableSubmitButton: ProButtonComponent;

  constructor(
    private restService: AuthRESTService,
    private traderService: TraderService,
    public dialog: MatDialog
  ) {
    this.isLoading = false;
    this.formErrors = {};
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.restService.requestTwoFactorQRData().subscribe((response) => {
      this.data = response;
      this.isLoading = false;
    });
  }

  get qrData(): TwoFactorQRData {
    return this.data;
  }

  get isQRLoading(): boolean {
    return this.isLoading;
  }

  get errors(): any {
    return this.formErrors;
  }

  submitEnableForm(submittedValue: TwoFactorData): void {
    this.enableSubmitButton.setLoadingOn();
    this.formErrors = {};
    this.restService.requestEnableTwoFactor(submittedValue).subscribe(
      (response) => {
        this.traderService.updateCurrentTrader().subscribe((trader) => {
          const recoveryDialogRef = this.dialog.open(
            SettingsQrRecoveryPopupComponent,
            {
              data: response,
            }
          );

          recoveryDialogRef.afterClosed().subscribe(() => {
            this.enableSubmitButton.setLoadingOff();
          });
        });
      },
      (errorResponse) => {
        this.enableSubmitButton.setLoadingOff();
      }
    );
  }

  submitDisableForm(submittedValue): void {
    this.disableSubmitButton.setLoadingOn();
    this.formErrors = {};
    this.restService.requestDisableTwoFactor(submittedValue).subscribe(
      (response) => {
        this.traderService.updateCurrentTrader().subscribe((trader) => {
          this.disableSubmitButton.setLoadingOff();
        });
      },
      (errorResponse) => {
        this.disableSubmitButton.setLoadingOff();

        if (errorResponse.status === 400) {
          const errors = errorResponse.error.errors;

          if (errors.Code) {
            this.formErrors.code = errors.Code;
          }

          for (const key of Object.keys(errors)) {
            if (!['Code', 'default'].includes(key)) {
              alert(`An error occured: There is something wrong with ${key}`);
            }
          }
        }
      }
    );
  }
}
