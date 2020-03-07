import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { DropdownMenuItem } from '@widget/models';
import {
  IconDefinition,
  faAngleDown,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'dropdown-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
})
export class DropdownMenuComponent implements OnInit, AfterViewInit {
  @Input() caption: string;

  @ViewChild('dropdownToggle') dropdownToggle: ElementRef;

  private isOpenState: boolean;

  constructor(private cdRef: ChangeDetectorRef, private el: ElementRef) {
    this.isOpenState = false;
  }

  ngOnInit(): void {
    if (!this.caption) {
      this.caption = 'Menu';
    }
  }

  ngAfterViewInit(): void {
    if (this.dropdownToggle) {
      this.dropdownToggle.nativeElement.addEventListener(
        'click',
        this.toggleDropdown.bind(this)
      );
    }

    this.cdRef.detach();
  }

  @HostListener('window:click', ['$event'])
  handleClickOnScreen($event: MouseEvent) {
    if (!this.el.nativeElement.contains($event.target as HTMLElement)) {
      this.isOpenState = false;

      this.cdRef.detectChanges();
    }
  }

  get isOpen(): boolean {
    return this.isOpenState;
  }

  get caretIcon(): IconDefinition {
    return this.isOpen ? faAngleUp : faAngleDown;
  }

  toggleDropdown(): void {
    this.isOpenState = !this.isOpenState;

    this.cdRef.detectChanges();
  }
}
