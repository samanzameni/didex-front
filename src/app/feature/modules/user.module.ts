import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPageComponent } from '@feature/pages';
import { WidgetModule } from '@widget/widget.module';
import { AuthGuard } from '@core/guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TraderResolver } from '@core/resolvers/trader.resolver';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
    //
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [],
  providers: [],
})
export class UserModule {}
