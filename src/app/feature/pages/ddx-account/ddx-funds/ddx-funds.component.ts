import { Component, OnInit } from '@angular/core';
import { DropdownSelectItem } from '@widget/models';
import {
  faHandHoldingUsd,
  faPiggyBank,
  faCoins,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

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

  constructor() {
    this.sortOptions = [
      { title: 'Most Available', value: 'available-dsc' },
      { title: 'Least Available', value: 'available-asc' },
    ];
  }

  ngOnInit(): void {}

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
    return [1, 2]; // TODO
  }

  onSortValueChange($event): void {
    console.log($event);
  }

  handleClickOnAction(rowIndex: number, action: string): void {
    console.log(rowIndex, action);
  }
}
