import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {
  KYCWrapperPageComponent,
  KYCPersonalInfoPageComponent,
  KYCPhoneVerificationPageComponent,
  KYCIdentityProofPageComponent,
  KYCSelfiePageComponent,
  KYCDonePageComponent,
} from '@feature/pages';
import { WidgetModule } from '@widget/widget.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KYCGuard } from '@core/guards/kyc.guard';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NativeDateModule, MatNativeDateModule } from '@angular/material/core';
import { LocalePipeModule } from './locale-pipe.module';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';

const routes: Routes = [
  {
    path: '',
    component: KYCWrapperPageComponent,
    canActivateChild: [KYCGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'personal-info' },
      { path: 'personal-info', component: KYCPersonalInfoPageComponent },
      {
        path: 'phone-verification',
        component: KYCPhoneVerificationPageComponent,
      },
      {
        path: 'identity-proof',
        component: KYCIdentityProofPageComponent,
      },
      {
        path: 'selfie',
        component: KYCSelfiePageComponent,
      },
      {
        path: 'done',
        component: KYCDonePageComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    KYCWrapperPageComponent,
    KYCPersonalInfoPageComponent,
    KYCPhoneVerificationPageComponent,
    KYCIdentityProofPageComponent,
    KYCSelfiePageComponent,
    KYCDonePageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    LocalePipeModule,
    FormsModule,
    ReactiveFormsModule,
    //
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NativeDateModule,
    NgPersianDatepickerModule,
  ],
  exports: [],
  providers: [MatNativeDateModule],
})
export class KYCModule {}
