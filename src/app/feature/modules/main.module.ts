import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {
  NavbarComponent,
  FooterComponent,
  InstrumentsComponent,
  MarketComponent,
  OrderBookComponent,
  TradesComponent,
  TimeAndSalesComponent,
  MarketFormComponent,
} from '@feature/components';
import { HomePageComponent } from '@feature/pages';
import { MainLayoutComponent } from '@feature/layouts';
import { WidgetModule } from '@widget/widget.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomePageComponent, pathMatch: 'full' },
      {
        path: 'user',
        loadChildren: () =>
          import('@feature/modules/user.module').then(
            (module) => module.UserModule
          ),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('@feature/modules/account.module').then(
            (module) => module.AccountModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [
    MainLayoutComponent,
    NavbarComponent,
    FooterComponent,
    HomePageComponent,
    //
    InstrumentsComponent,
    MarketComponent,
    MarketFormComponent,
    OrderBookComponent,
    TradesComponent,
    TimeAndSalesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    FormsModule,
    ReactiveFormsModule,
    //
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  exports: [],
  providers: [],
})
export class MainModule {}
