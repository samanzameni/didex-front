import { Component, OnInit } from '@angular/core';
import { DropdownSelectItem } from '@widget/models';
import {
  faHandHoldingUsd,
  faPiggyBank,
  faCoins,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { BankingRESTService } from '@core/services/REST';
import { Balance } from '@core/models';

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
  private data: Balance[];

  constructor(private restService: BankingRESTService) {
    this.sortOptions = [
      { title: 'Most Available', value: 'available-dsc' },
      { title: 'Least Available', value: 'available-asc' },
    ];
  }

  ngOnInit(): void {
    this.restService.requestBalance().subscribe(response => {
      this.data = response || [];
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

  get tableRows(): Balance[] {
    return this.data || [];
  }

  onSortValueChange($event): void {
    console.log($event);
  }

  handleClickOnAction(rowIndex: number, action: string): void {
    console.log(rowIndex, action);
  }
}
