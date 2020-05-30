import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ddx-settings-qr-recovery-popup',
  templateUrl: './ddx-settings-qr-recovery-popup.component.html',
  styleUrls: ['./ddx-settings-qr-recovery-popup.component.scss'],
})
export class SettingsQrRecoveryPopupComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('######', data);
  }

  ngOnInit(): void {}
}
