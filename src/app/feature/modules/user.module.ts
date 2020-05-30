import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@core/guards/auth.guard';
import { TraderResolver } from '@core/resolvers/trader.resolver';
import { SettingsPageComponent } from '@feature/pages';
import {
  SettingsQRFormComponent,
  SettingsQrRecoveryPopupComponent,
} from '@feature/components';
import { WidgetModule } from '@widget/widget.module';
import { LocalePipeModule } from './locale-pipe.module';

import { QRCodeModule } from 'angularx-qrcode';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsPageComponent,
    canActivate: [AuthGuard],
    resolve: { trader: TraderResolver },
  },
  {
    path: 'kyc',
    loadChildren: () =>
      import('@feature/modules/kyc.module').then((module) => module.KYCModule),
  },
];

@NgModule({
  declarations: [
    SettingsPageComponent,
    SettingsQRFormComponent,
    SettingsQrRecoveryPopupComponent,
  ],
  entryComponents: [SettingsQrRecoveryPopupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    LocalePipeModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule,
    //
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatSnackBarModule,
    MatDialogModule,
    // MatProgressSpinnerModule,
  ],
  exports: [],
  providers: [],
})
export class UserModule {}
