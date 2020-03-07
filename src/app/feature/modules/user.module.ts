import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPageComponent } from '@feature/pages';
import { WidgetModule } from '@widget/widget.module';
import { AuthGuard } from '@core/guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TraderResolver } from '@core/resolvers/trader.resolver';

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
      import('@feature/modules/kyc.module').then(module => module.KYCModule),
  },
];

@NgModule({
  declarations: [SettingsPageComponent],
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
export class UserModule {}
