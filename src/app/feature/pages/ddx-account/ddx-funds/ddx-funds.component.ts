import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
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
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef,
    private snackBarService: MatSnackBar
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

  mapColumnToHeader(columnName: string): string {
    switch (columnName) {
      case 'shortName':
        return 'Coin';
      case 'main':
        return 'Main Account';
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

  onSortValueChange($event): void {
    console.log($event);
  }

  handleClickOnAction(rowIndex: number, action: string): void {
    this.formsAllErrors = [];
    const actionID = `${rowIndex}-${action}`;
    console.log(actionID);

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
    if (this.transferButton) {
      this.renderer.addClass(this.transferButton.nativeElement, 'is-loading');
    }
    submittedValue.type = parseInt(
      submittedValue.type,
      10
    ) as BalanceTransferType;

    this.restService
      .requestTransfer(submittedValue as BalanceTransferData)
      .subscribe(
        (response) => {
          if (this.transferButton) {
            this.renderer.removeClass(
              this.transferButton.nativeElement,
              'is-loading'
            );
          }
          this.currentActivePane = 'none';
          this.updateData();
        },
        (errorResponse) => {
          if (this.transferButton) {
            this.renderer.removeClass(
              this.transferButton.nativeElement,
              'is-loading'
            );
            this.cdRef.detectChanges();
          }

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
    if (this.withdrawButton) {
      this.renderer.addClass(this.withdrawButton.nativeElement, 'is-loading');
      this.cdRef.detectChanges();
    }

    submittedValue.includeFee = true;
    submittedValue.autoCommit = true;

    this.restService.requestWithdraw(submittedValue).subscribe(
      (response) => {
        if (this.withdrawButton) {
          this.renderer.removeClass(
            this.withdrawButton.nativeElement,
            'is-loading'
          );
        }
        this.currentActivePane = 'none';
        this.updateData();
      },
      (errorResponse) => {
        if (this.withdrawButton) {
          this.renderer.removeClass(
            this.withdrawButton.nativeElement,
            'is-loading'
          );
          this.cdRef.detectChanges();
        }

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
