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
} from '@feature/components';
import { HomePageComponent } from '@feature/pages';
import { MainLayoutComponent } from '@feature/layouts';
import { WidgetModule } from '@widget/widget.module';
import { FormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

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
            module => module.UserModule
          ),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('@feature/modules/account.module').then(
            module => module.AccountModule
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
    OrderBookComponent,
    TradesComponent,
    TimeAndSalesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    FormsModule,
    //
    MatMenuModule,
    MatIconModule,
  ],
  exports: [],
  providers: [],
})
export class MainModule {}
