import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'dropdown-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
})
export class DropdownMenuComponent implements OnInit, AfterViewInit {
  @Input() caption: string;
  @ViewChild('dropdownToggle', { static: false }) dropdownToggle: ElementRef;

  private isOpenState: boolean;

  constructor(private cdRef: ChangeDetectorRef) {
    this.isOpenState = false;
  }

  ngOnInit(): void {
    if (!this.caption) {
      this.caption = 'Menu';
    }
  }

  ngAfterViewInit(): void {
    if (this.dropdownToggle) {
      // TODO
    }

    this.cdRef.detach();
  }

  get isOpen(): boolean {
    return this.isOpenState;
  }

  toggleDropdown(): void {
    this.isOpenState = !this.isOpenState;

    this.cdRef.detectChanges();
  }
}
