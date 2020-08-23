import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';

import {
  NavbarComponent,
  NotificationBarComponent,
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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TraderResolver } from '@core/resolvers/trader.resolver';
import { LocalePipeModule } from './locale-pipe.module';
import { CreditCardMaskPipeModule } from './credit-card-mask.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    resolve: { trader: TraderResolver },
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
    NotificationBarComponent,
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
    LocalePipeModule,
    CreditCardMaskPipeModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    LayoutModule,
    //
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
  ],
  exports: [],
  providers: [],
})
export class MainModule {}
