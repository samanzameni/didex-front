import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {
  KYCWrapperPageComponent,
  KYCPersonalInfoPageComponent,
  KYCPhoneVerificationPageComponent,
  KYCIdentityProofPageComponent,
  KYCSelfiePageComponent,
} from '@feature/pages';
import { WidgetModule } from '@widget/widget.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: KYCWrapperPageComponent,
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
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    FormsModule,
  ],
  exports: [],
  providers: [],
})
export class KYCModule {}
