import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[arrangeInline]',
})
export class ArrangeInlineDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    renderer.setStyle(el.nativeElement, 'display', 'flex');
  }
}
