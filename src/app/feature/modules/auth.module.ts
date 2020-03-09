import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { WidgetModule } from '@widget/widget.module';
import {
  SignInPageComponent,
  SignUpPageComponent,
  ForgotPasswordPageComponent,
  SignUpSuccessPageComponent,
  ResetPasswordPageComponent,
  ActivateEmailPageComponent,
} from '@feature/pages';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signin',
  },
  {
    path: 'signin',
    component: SignInPageComponent,
  },
  {
    path: 'signup',
    pathMatch: 'full',
    component: SignUpPageComponent,
  },
  {
    path: 'signup/success',
    pathMatch: 'full',
    component: SignUpSuccessPageComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordPageComponent,
  },
  {
    path: 'activate-email',
    component: ActivateEmailPageComponent,
  },
];

@NgModule({
  declarations: [
    SignInPageComponent,
    SignUpPageComponent,
    ForgotPasswordPageComponent,
    SignUpSuccessPageComponent,
    ResetPasswordPageComponent,
    ActivateEmailPageComponent,
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
export class AuthModule {}
