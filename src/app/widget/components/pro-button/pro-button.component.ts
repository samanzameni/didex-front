import {
  Component,
  Input,
  Renderer2,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';

@Component({
  selector: 'pro-button',
  templateUrl: './pro-button.component.html',
  styleUrls: ['./pro-button.component.scss'],
})
export class ProButtonComponent {
  @Input() color: 'basic' | 'primary' | 'accent' | 'warn' = 'basic';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() stroked = false;

  @ViewChild('theButton') theButton: any;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    (el.nativeElement as HTMLElement).tabIndex = 0;
  }

 @HostListener('keydown.enter', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(this.type === 'submit' && !this.disabled) {
      this.getButtonElement().click();
    };
  }

  private getButtonElement(): HTMLButtonElement {
    return (
      this.theButton.nativeElement || this.theButton._elementRef.nativeElement
    );
  }

  public setLoadingOn(): void {
    this.renderer.addClass(this.getButtonElement(), 'is-loading');
  }

  public setLoadingOff(): void {
    this.renderer.removeClass(this.getButtonElement(), 'is-loading');
  }

}
