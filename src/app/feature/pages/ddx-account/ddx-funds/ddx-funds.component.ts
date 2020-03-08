import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
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
import { Balance, Currency, BalanceWithdrawData } from '@core/models';
import { combineLatest } from 'rxjs';
import Decimal from 'decimal.js';
import { copyToClipboard } from '@core/util/clipboard';

@Component({
  selector: 'ddx-funds',
  templateUrl: './ddx-funds.component.html',
  styleUrls: [
    '../../../public/ddx-account-pages.scss',
    './ddx-funds.component.scss',
  ],
})
export class FundsPageComponent implements OnInit {
  private sortOptions: DropdownSelectItem[];

  private bankingBalanceData: Balance[];
  private tradingBalanceData: Balance[];
  private currenciesData: Currency[];
  private combinedData: any[]; // TODO: type

  private currentActivePane: string;

  @ViewChild('withdrawButton') withdrawButton: ElementRef;

  constructor(
    private restService: BankingRESTService,
    private publicService: PublicRESTService,
    private tradingService: TradingRESTService,
    private renderer: Renderer2
  ) {
    this.currentActivePane = 'none';
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

    dataFetcher.subscribe(([b, t, c]) => {
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
    });
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

  get tradeIcon(): IconDefinition {
    return faCoins;
  }

  get tableRows(): any[] {
    return this.combinedData || [];
  }

  get activePane(): string {
    return this.currentActivePane;
  }

  onSortValueChange($event): void {
    console.log($event);
  }

  handleClickOnAction(rowIndex: number, action: string): void {
    const actionID = `${rowIndex}-${action}`;

    this.currentActivePane =
      this.currentActivePane === actionID ? 'none' : actionID;
  }

  handleClickOnCopyAddress(address: string) {
    copyToClipboard(address);
  }

  onSubmitWithdraw(index: number, submittedValue: BalanceWithdrawData): void {
    if (this.withdrawButton) {
      this.renderer.addClass(this.withdrawButton.nativeElement, 'is-loading');
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
        }
      }
    );
  }
}
