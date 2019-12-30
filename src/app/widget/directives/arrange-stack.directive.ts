import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[arrangeStack]',
})
export class ArrangeStackDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    renderer.setStyle(el.nativeElement, 'display', 'flex');
    renderer.setStyle(el.nativeElement, 'flex-direction', 'column');
  }
}
