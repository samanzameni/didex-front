import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[arrangeCenter]',
})
export class ArrangeCenterDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    renderer.setStyle(el.nativeElement, 'display', 'flex');
    renderer.setStyle(el.nativeElement, 'align-items', 'center');
    renderer.setStyle(el.nativeElement, 'justify-content', 'center');
  }
}
