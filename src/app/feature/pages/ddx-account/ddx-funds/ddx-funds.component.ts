import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { DropdownSelectItem } from '@widget/models';
import {
  faHandHoldingUsd,
  faPiggyBank,
  faCoins,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  BankingRESTService,
  PublicRESTService,
  TradingRESTService,
  BankAccountRESTService,
} from '@core/services/REST';
import {
  Balance,
  Currency,
  BalanceWithdrawData,
  BalanceTransferData,
  BalanceTransferType,
  WalletAddress,
  BankAccount,
} from '@core/models';
import { combineLatest, Observable } from 'rxjs';
import Decimal from 'decimal.js';
import { copyToClipboard } from '@core/util/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { TraderService, DirectionService } from '@core/services';
import { LocalePipe } from '@feature/pipes/ddx-locale.pipe';
import { CreditCardMaskPipe } from '@feature/pipes/ddx-credit-card-mask.pipe';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddBankAccountComponent } from '@feature/components/ddx-dialog-add-bank-account/ddx-dialog-add-bank-account.component';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'ddx-funds',
  templateUrl: './ddx-funds.component.html',
  styleUrls: [
    '../../../public/ddx-account-pages.scss',
    './ddx-funds.component.scss',
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class FundsPageComponent implements OnInit, AfterViewInit {
  private sortOptions: DropdownSelectItem[];

  private bankingBalanceData: Balance[];
  private tradingBalanceData: Balance[];
  private currenciesData: Currency[];
  private combinedData: any[]; // TODO: type

  private currentActivePane: string;
  private currentTransferType: BalanceTransferType;
  private currentWalletAddress: WalletAddress;

  private formsAllErrors: string[];

  private _bankAccounts: BankAccount.Model[];

  private _isKycApproved: boolean;
  private _isKycNewbie: boolean;

  @ViewChild('withdrawButton') withdrawButton: ElementRef;
  @ViewChild('transferButton') transferButton: ElementRef;

  constructor(
    private restService: BankingRESTService,
    private publicService: PublicRESTService,
    private tradingService: TradingRESTService,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef,
    private snackBarService: MatSnackBar,
    private traderService: TraderService,
    private localePipe: LocalePipe,
    private creditCardMaskPipe: CreditCardMaskPipe,
    private bankAccountService: BankAccountRESTService,
    private dialog: MatDialog,
    private router: Router,
    private directionService: DirectionService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    this.currentActivePane = 'none';
    this.currentTransferType = BalanceTransferType.BankToExchange;

    this.sortOptions = [
      { title: 'Most Available', value: 'available-dsc' },
      { title: 'Least Available', value: 'available-asc' },
    ];

    this.bankingBalanceData = [];
    this.tradingBalanceData = [];
    this.currenciesData = [];
    this.combinedData = [];

    this.formsAllErrors = [];

    this._bankAccounts = [];

    this._isKycApproved = false;

    iconRegistry.addSvgIcon(
      'deposit',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icon_deposit.svg')
    );
    iconRegistry.addSvgIcon(
      'withdraw',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icon_withdraw.svg')
    );
    iconRegistry.addSvgIcon(
      'transfer',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icon_transfer.svg')
    );
  }

  ngOnInit(): void {
    this._isKycApproved = this.traderService.hasKYCApproved;
    this._isKycNewbie = this.traderService.isNewbie;
    this.updateData();
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  translate(text: string): string {
    return this.localePipe.transform(text);
  }

  maskCardNumber(creditCardNumber: string): string {
    return this.creditCardMaskPipe.transform(creditCardNumber);
  }

  private updateData(): void {
    this.bankingBalanceData = [];
    this.tradingBalanceData = [];
    this.currenciesData = [];
    this.combinedData = [];

    const bankingBalance$ = this.restService.requestBalance();
    const tradingBalance$ = this.tradingService.requestBalance();
    const currency$ = this.publicService.requestCurrency();
    const bankAccounts$ = this.bankAccountService
      .requestListBankAccounts()
      .pipe(
        catchError((err) => {
          return [];
        })
      );

    if (this._isKycApproved) {
      const dataFetcher$ = combineLatest([
        bankingBalance$,
        tradingBalance$,
        currency$,
        bankAccounts$,
      ]);

      dataFetcher$.subscribe(
        ([b, t, c, a]) => {
          this._bankAccounts = a;
          this.mergeData(b, t, c);
        },
        (errorResponse) => {
          this.cdRef.detectChanges();
        }
      );
    } else {
      const dataFetcher$ = combineLatest([
        bankingBalance$,
        tradingBalance$,
        currency$,
      ]);

      dataFetcher$.subscribe(
        ([b, t, c]) => {
          this.mergeData(b, t, c);
        },
        (errorResponse) => {
          this.cdRef.detectChanges();
        }
      );
    }
  }

  private mergeData(b, t, c): void {
    this.bankingBalanceData = b;
    this.tradingBalanceData = t;
    this.currenciesData = c;

    this.combinedData = Array.from(this.currenciesData);
    this.combinedData.forEach((currency, i) => {
      this.combinedData[i].available = new Decimal(0);
      this.combinedData[i].reserved = new Decimal(0);
      this.combinedData[i].main = new Decimal(0);

      this.bankingBalanceData.forEach((balance) => {
        if (currency.shortName.trim() === balance.currency.trim()) {
          this.combinedData[i].main = new Decimal(balance.available);
          return;
        }
      });

      this.tradingBalanceData.forEach((balance) => {
        if (currency.shortName.trim() === balance.currency.trim()) {
          this.combinedData[i].available = new Decimal(balance.available);
          this.combinedData[i].reserved = new Decimal(balance.reserved);
          return;
        }
      });

      this.combinedData[i].total = this.combinedData[i].available
        .add(this.combinedData[i].reserved)
        .add(this.combinedData[i].main);
    });
    this.cdRef.detectChanges();
  }

  get direction$(): Observable<string> {
    return this.directionService.direction$;
  }

  get sortSelectOptions(): DropdownSelectItem[] {
    return this.sortOptions;
  }

  get depositIcon(): IconDefinition {
    return faPiggyBank;
  }

  get withdrawIcon(): IconDefinition {
    return faHandHoldingUsd;
  }

  get transferIcon(): IconDefinition {
    return faCoins;
  }

  get tableRows(): any[] {
    return this.combinedData || [];
  }

  get displayedColumns(): string[] {
    return [...this.dataColumns, 'actions'];
  }

  get dataColumns(): string[] {
    return ['shortName', 'main', 'available', 'reserved', 'total'];
  }

  get activePane(): string {
    return this.currentActivePane;
  }

  get transferType(): BalanceTransferType {
    return this.currentTransferType;
  }

  get walletAddress(): WalletAddress {
    return this.currentWalletAddress;
  }

  get allErrors(): string[] {
    return this.formsAllErrors || [];
  }

  get hasTraderEnabledTwoFactor(): boolean {
    return this.traderService.currentTrader.twoFactorEnabled;
  }

  get bankAccounts(): BankAccount.Model[] {
    return this._bankAccounts;
  }

  get isKycApproved(): boolean {
    return this._isKycApproved;
  }

  get isKycNewbie(): boolean {
    return this._isKycNewbie;
  }

  mapColumnToHeader(columnName: string): string {
    switch (columnName) {
      case 'shortName':
        return this.localePipe.transform('funds.shortName');
      case 'main':
        return this.localePipe.transform('funds.main');
      case 'available':
        return this.localePipe.transform('funds.available');
      case 'reserved':
        return this.localePipe.transform('funds.reserved');
      case 'total':
        return this.localePipe.transform('funds.total');
      case 'actions':
        return this.localePipe.transform('funds.actions');
      default:
        return '';
    }
  }

  mapColumnToTooltip(columnName: string): string {
    switch (columnName) {
      case 'shortName':
        return this.localePipe.transform('funds.shortName_tooltip');
      case 'main':
        return this.localePipe.transform('funds.main_tooltip');
      case 'available':
        return this.localePipe.transform('funds.available_tooltip');
      case 'reserved':
        return this.localePipe.transform('funds.reserved_tooltip');
      case 'total':
        return this.localePipe.transform('funds.total_tooltip');
      default:
        return null;
    }
  }

  onSortValueChange($event): void {
    console.log($event);
  }

  handleClickOnAction(rowIndex: number, action: string): void {
    this.formsAllErrors = [];
    const actionID = `${rowIndex}-${action}`;

    this.currentActivePane =
      this.currentActivePane === actionID ? 'none' : actionID;

    this.cdRef.detectChanges();

    if (action === 'deposit') {
      this.currentWalletAddress = null;
      this.restService
        .requestWalletAddress({
          currencyShortName: this.tableRows[rowIndex].shortName,
        })
        .subscribe(
          (response) => {
            this.currentWalletAddress = response;
            this.cdRef.detectChanges();
          },
          (errorResponse) => {
            this.currentWalletAddress = {
              address: this.localePipe.transform(
                'funds.deposit.fetching_error'
              ),
            };
          }
        );
    }
  }

  handleClickOnCopyAddress() {
    this.snackBarService.open(
      this.localePipe.transform('funds.deposit.copied'),
      '',
      { duration: 1500 }
    );
  }

  handleRadioValueChanges($event): void {
    this.currentTransferType = $event;
  }

  openAddBankAccountDialog(currencyShortName: string): void {
    const addBankAccountDialogRef = this.dialog.open(
      DialogAddBankAccountComponent,
      {
        width: '420px',
        data: { currencyShortName },
      }
    );

    addBankAccountDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._bankAccounts.push(result);
        this.cdRef.detectChanges();
        this.toastr.success(
          this.localePipe.transform('funds.deposit.r2_fiat_add_toast_message'),
          this.localePipe.transform('funds.deposit.r2_fiat_add_toast_title')
        );
      }
    });
  }

  onSubmitFiatDeposit(
    submittedValue: BankAccount.DepositInitiateFormData
  ): void {
    this.formsAllErrors = [];

    this.bankAccountService.requestDepositFiat(submittedValue).subscribe(
      (response) => {
        this.router.navigateByUrl(
          this.router.parseUrl(
            `/external-redirect?redirect_url=${response.redirectLink}`
          )
        );
      },
      (errorResponse) => {
        if (errorResponse.status === 400) {
          const errors = errorResponse.error.errors;

          for (const e of Object.keys(errors)) {
            this.formsAllErrors.push(...errors[e]);
          }
        }
      }
    );
  }

  onSubmitTransfer(index: number, submittedValue: any): void {
    this.formsAllErrors = [];

    this.restService
      .requestTransfer(submittedValue as BalanceTransferData)
      .subscribe(
        (response) => {
          this.currentActivePane = 'none';
          this.updateData();
        },
        (errorResponse) => {
          if (errorResponse.status === 400) {
            const errors = errorResponse.error.errors;

            for (const e of Object.keys(errors)) {
              this.formsAllErrors.push(...errors[e]);
            }
          }
        }
      );
  }

  onSubmitCryptoWithdraw(
    index: number,
    submittedValue: BalanceWithdrawData
  ): void {
    this.formsAllErrors = [];

    submittedValue.includeFee = true;
    submittedValue.autoCommit = true;

    this.restService.requestWithdraw(submittedValue).subscribe(
      (response) => {
        this.toastr.success(
          this.localePipe.transform('funds.withdraw.toast_confirmation_body'),
          this.localePipe.transform('funds.withdraw.toast_confirmation_title')
        );
      },
      (errorResponse) => {
        if (errorResponse.status === 400) {
          const errors = errorResponse.error.errors;

          for (const e of Object.keys(errors)) {
            this.formsAllErrors.push(...errors[e]);
          }
        }
      }
    );
  }

  onSubmitFiatWithdraw(
    index: number,
    submittedValue: BankAccount.WithdrawFormData
  ): void {
    this.formsAllErrors = [];

    submittedValue.includeFee = true;
    submittedValue.autoCommit = true;

    this.bankAccountService.requestWithdrawFiat(submittedValue).subscribe(
      (response) => {
        this.toastr.success(
          this.localePipe.transform('funds.withdraw.toast_confirmation_body'),
          this.localePipe.transform('funds.withdraw.toast_confirmation_title')
        );
      },
      (errorResponse) => {
        if (errorResponse.status === 400) {
          const errors = errorResponse.error.errors;

          for (const e of Object.keys(errors)) {
            this.formsAllErrors.push(...errors[e]);
          }
        }
      }
    );
  }

  onSubmitWithdraw(
    index: number,
    submittedValue: any,
    isCrypto: boolean = true
  ): void {
    if (isCrypto) {
      this.onSubmitCryptoWithdraw(index, submittedValue);
    } else {
      this.onSubmitFiatWithdraw(index, submittedValue);
    }
  }
}
