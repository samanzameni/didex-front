import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {
  KYCWrapperPageComponent,
  KYCPersonalInfoPageComponent,
} from '@feature/pages';
import { WidgetModule } from '@widget/widget.module';

const routes: Routes = [
  {
    path: '',
    component: KYCWrapperPageComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'personal-info' },
      { path: 'personal-info', component: KYCPersonalInfoPageComponent },
    ],
  },
];

@NgModule({
  declarations: [KYCWrapperPageComponent, KYCPersonalInfoPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes), WidgetModule],
  exports: [],
  providers: [],
})
export class KYCModule {}
