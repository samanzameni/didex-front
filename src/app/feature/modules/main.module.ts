import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {
  NavbarComponent,
  FooterComponent,
  InstrumentsComponent,
  MarketComponent,
  OrderBookComponent,
} from '@feature/components';
import { HomePageComponent } from '@feature/pages';
import { MainLayoutComponent } from '@feature/layouts';
import { WidgetModule } from '@widget/widget.module';

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
  ],
  imports: [CommonModule, RouterModule.forChild(routes), WidgetModule],
  exports: [],
  providers: [],
})
export class MainModule {}
