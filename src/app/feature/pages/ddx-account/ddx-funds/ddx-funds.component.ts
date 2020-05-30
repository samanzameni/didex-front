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
} from '@core/services/REST';
import {
  Balance,
  Currency,
  BalanceWithdrawData,
  BalanceTransferData,
  BalanceTransferType,
  WalletAddress,
} from '@core/models';
import { combineLatest } from 'rxjs';
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
import { TraderService } from '@core/services';

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

  @ViewChild('withdrawButton') withdrawButton: ElementRef;
  @ViewChild('transferButton') transferButton: ElementRef;

  constructor(
    private restService: BankingRESTService,
    private publicService: PublicRESTService,
    private tradingService: TradingRESTService,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef,
    private snackBarService: MatSnackBar,
    private traderService: TraderService
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
  }

  ngOnInit(): void {
    this.updateData();
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  private updateData(): void {
    this.bankingBalanceData = [];
    this.tradingBalanceData = [];
    this.currenciesData = [];
    this.combinedData = [];

    const bankingBalance$ = this.restService.requestBalance();
    const tradingBalance$ = this.tradingService.requestBalance();
    const currency$ = this.publicService.requestCurrency();

    const dataFetcher = combineLatest([
      bankingBalance$,
      tradingBalance$,
      currency$,
    ]);

    dataFetcher.subscribe(
      ([b, t, c]) => {
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
      },
      (errorResponse) => {
        this.cdRef.detectChanges();
      }
    );
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

  mapColumnToHeader(columnName: string): string {
    switch (columnName) {
      case 'shortName':
        return 'Coin';
      case 'main':
        return 'Main';
      case 'available':
        return 'Available';
      case 'reserved':
        return 'On Orders';
      case 'total':
        return 'Total';
      case 'actions':
        return 'Actions';
      default:
        return '';
    }
  }

  mapColumnToTooltip(columnName: string): string {
    switch (columnName) {
      case 'shortName':
        return 'Name of CryptoCurrency';
      case 'main':
        return 'The amount which exists in main account';
      case 'available':
        return 'The amount which exists in trading account';
      case 'reserved':
        return 'The amount which is already in the order list and is reserved';
      case 'total':
        return 'The summation of Main account, Available and On Orders';
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
            this.currentWalletAddress = { address: 'Error while fetching ...' };
          }
        );
    }
  }

  handleClickOnCopyAddress() {
    this.snackBarService.open('Copied!', '', { duration: 1500 });
  }

  handleRadioValueChanges($event): void {
    this.currentTransferType = $event;
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

  onSubmitWithdraw(index: number, submittedValue: BalanceWithdrawData): void {
    this.formsAllErrors = [];

    submittedValue.includeFee = true;
    submittedValue.autoCommit = true;

    this.restService.requestWithdraw(submittedValue).subscribe(
      (response) => {
        // this.currentActivePane = 'none';
        // this.updateData();
        this.toastr.success(
          'An email is sent for withdrawal confirmation. Check your inbox',
          'Confirmation required'
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
}
