import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  ChangeDetectorRef,
  AfterViewInit,
  ChangeDetectionStrategy,
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
} from '@core/models';
import { combineLatest } from 'rxjs';
import Decimal from 'decimal.js';
import { copyToClipboard } from '@core/util/clipboard';

@Component({
  selector: 'ddx-funds',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ddx-funds.component.html',
  styleUrls: [
    '../../../public/ddx-account-pages.scss',
    './ddx-funds.component.scss',
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

  @ViewChild('withdrawButton') withdrawButton: ElementRef;
  @ViewChild('transferButton') transferButton: ElementRef;

  constructor(
    private restService: BankingRESTService,
    private publicService: PublicRESTService,
    private tradingService: TradingRESTService,
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef
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

          this.bankingBalanceData.forEach(balance => {
            if (currency.shortName.trim() === balance.currency.trim()) {
              this.combinedData[i].main = new Decimal(balance.available);
              return;
            }
          });

          this.tradingBalanceData.forEach(balance => {
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
      errorResponse => {
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

  get activePane(): string {
    return this.currentActivePane;
  }

  get transferType(): BalanceTransferType {
    return this.currentTransferType;
  }

  onSortValueChange($event): void {
    console.log($event);
  }

  handleClickOnAction(rowIndex: number, action: string): void {
    const actionID = `${rowIndex}-${action}`;

    this.currentActivePane =
      this.currentActivePane === actionID ? 'none' : actionID;
    this.cdRef.detectChanges();
  }

  handleClickOnCopyAddress(address: string) {
    copyToClipboard(address);
  }

  handleRadioValueChanges($event): void {
    this.currentTransferType = $event;
  }

  onSubmitTransfer(index: number, submittedValue: any): void {
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
        response => {
          if (this.transferButton) {
            this.renderer.removeClass(
              this.transferButton.nativeElement,
              'is-loading'
            );
          }
          this.currentActivePane = 'none';
          this.updateData();
        },
        errorResponse => {
          if (this.transferButton) {
            this.renderer.removeClass(
              this.transferButton.nativeElement,
              'is-loading'
            );
            this.cdRef.detectChanges();
          }
        }
      );
  }

  onSubmitWithdraw(index: number, submittedValue: BalanceWithdrawData): void {
    if (this.withdrawButton) {
      this.renderer.addClass(this.withdrawButton.nativeElement, 'is-loading');
      this.cdRef.detectChanges();
    }

    this.restService.requestWithdraw(submittedValue).subscribe(
      response => {
        if (this.withdrawButton) {
          this.renderer.removeClass(
            this.withdrawButton.nativeElement,
            'is-loading'
          );
        }
        this.currentActivePane = 'none';
        this.updateData();
      },
      errorResponse => {
        if (this.withdrawButton) {
          this.renderer.removeClass(
            this.withdrawButton.nativeElement,
            'is-loading'
          );
          this.cdRef.detectChanges();
        }
      }
    );
  }
}
