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
  SaleComponent,
} from '@feature/components';
import { HomePageComponent } from '@feature/pages';
import { MainLayoutComponent } from '@feature/layouts';
import { WidgetModule } from '@widget/widget.module';
import { FormsModule } from '@angular/forms';

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
    SaleComponent,
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
export class MainModule {}
