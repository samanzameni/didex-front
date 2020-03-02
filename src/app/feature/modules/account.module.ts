import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { WidgetModule } from '@widget/widget.module';
import { FundsPageComponent, ReportsPageComponent } from '@feature/pages';
import { AuthGuard } from '@core/guards';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'funds',
    pathMatch: 'full',
  },
  {
    path: 'funds',
    component: FundsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reports',
    component: ReportsPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [FundsPageComponent, ReportsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  exports: [],
  providers: [],
})
export class AccountModule {}
