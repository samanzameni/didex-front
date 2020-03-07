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
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [],
})
export class KYCModule {}
