import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[arrangeInlineWrap]',
})
export class ArrangeInlineWrapDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    renderer.setStyle(el.nativeElement, 'display', 'flex');
    renderer.setStyle(el.nativeElement, 'flex-wrap', 'wrap');
  }
}
