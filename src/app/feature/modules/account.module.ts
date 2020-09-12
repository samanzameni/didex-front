import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { WidgetModule } from '@widget/widget.module';
import {
  FundsPageComponent,
  ReportsPageComponent,
  WithdrawConfirmationPageComponent,
  DepositCallbackHandlerPageComponent,
} from '@feature/pages';
import { AuthGuard } from '@core/guards';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LocalePipeModule } from '../../widget/modules/locale-pipe.module';
import { CreditCardMaskPipeModule } from './credit-card-mask.module';
import { ToastrModule } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddBankAccountComponent } from '@feature/components/ddx-dialog-add-bank-account/ddx-dialog-add-bank-account.component';

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
  {
    path: 'withdraw/confirm',
    component: WithdrawConfirmationPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'deposit/callback',
    component: DepositCallbackHandlerPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    FundsPageComponent,
    ReportsPageComponent,
    WithdrawConfirmationPageComponent,
    DialogAddBankAccountComponent,
    DepositCallbackHandlerPageComponent,
  ],
  entryComponents: [DialogAddBankAccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    ToastrModule,
    FormsModule,
    LocalePipeModule,
    CreditCardMaskPipeModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    //
    ClipboardModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
  ],
  exports: [],
  providers: [DatePipe],
})
export class AccountModule {}
