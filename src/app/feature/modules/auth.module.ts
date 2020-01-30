import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { WidgetModule } from '@widget/widget.module';
import { SignInPageComponent, SignUpPageComponent } from '@feature/pages';

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
    component: SignUpPageComponent,
  },
];

@NgModule({
  declarations: [SignInPageComponent, SignUpPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    FormsModule,
  ],
  exports: [],
  providers: [],
})
export class AuthModule {}
