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
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

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

  constructor(
    private cdRef: ChangeDetectorRef,
    private el: ElementRef,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    this.isOpenState = false;
    iconRegistry.addSvgIcon(
      'account',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icon-account.svg')
    );
    iconRegistry.addSvgIcon(
      'profile',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icon-profile.svg')
    );
    iconRegistry.addSvgIcon(
      'desktop-menu',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/icon-desktop-menu.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'arrow-down',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/icon-arrow-down.svg'
      )
    );
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
