import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPageComponent } from '@feature/pages';
import { WidgetModule } from '@widget/widget.module';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsPageComponent,
  },
  {
    path: 'kyc',
    loadChildren: () =>
      import('@feature/modules/kyc.module').then(module => module.KYCModule),
  },
];

@NgModule({
  declarations: [SettingsPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes), WidgetModule],
  exports: [],
  providers: [],
})
export class UserModule {}
