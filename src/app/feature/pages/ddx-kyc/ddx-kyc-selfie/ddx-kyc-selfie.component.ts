import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ddx-kyc-selfie',
  templateUrl: './ddx-kyc-selfie.component.html',
  styleUrls: [
    '../../../public/ddx-kyc-pages.scss',
    './ddx-kyc-selfie.component.scss',
  ],
})
export class KYCSelfiePageComponent implements OnInit {
  constructor(
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.renderer.addClass(this.el.nativeElement, 'kyc-form');
  }

  ngOnInit() {}

  onSubmit(): void {}
}
