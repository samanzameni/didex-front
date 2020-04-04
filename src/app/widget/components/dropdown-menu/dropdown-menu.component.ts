import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
} from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'dropdown-menu',
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
})
export class DropdownMenuComponent implements OnInit {
  @Input() caption: string;
  @Input() icon: string;

  @ViewChild('theMenuTrigger') theMenuTrigger: MatMenuTrigger;

  private isOpenState: boolean;

  constructor(private cdRef: ChangeDetectorRef, private el: ElementRef) {
    this.isOpenState = false;
  }

  ngOnInit(): void {
    if (!this.caption) {
      this.caption = 'Menu';
    }
  }

  onMenuOpen($event): void {
    this.isOpenState = true;
  }

  onMenuClose($event): void {
    this.isOpenState = false;
  }

  get isOpen(): boolean {
    return this.isOpenState;
  }
}
