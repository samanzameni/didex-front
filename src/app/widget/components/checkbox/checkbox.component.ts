import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  Input,
  HostListener,
} from '@angular/core';
import { DataEntry } from '@widget/templates';

@Component({
  selector: 'checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent extends DataEntry<boolean> implements OnInit {
  @ViewChild('checkboxElement', { static: false }) checkboxElement: ElementRef;

  @Input() hasDarkTheme: boolean;

  constructor(private cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.cdRef.detach();
    this.cdRef.detectChanges();
  }

  get isValid(): boolean {
    return this.isRequired ? this.isRequired && this.value : true;
  }

  onCheck($event): void {
    this.data = $event.target.checked;
    this.valueChange.emit(this.value);
    this.cdRef.detectChanges();
  }

  setState(checked: boolean): void {
    this.data = checked;
    this.checkboxElement.nativeElement.checked = checked;
    this.valueChange.emit(this.value);
    this.cdRef.detectChanges();
  }

  @HostListener('keydown', ['$event'])
  handleSpace($event: KeyboardEvent) {
    if ($event.code === 'Space') {
      // space
      this.setState(!this.data);
    }
  }
}
