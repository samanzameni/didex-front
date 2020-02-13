import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ddx-kyc-identity-proof',
  templateUrl: './ddx-kyc-identity-proof.component.html',
  styleUrls: [
    '../../../public/ddx-kyc-pages.scss',
    './ddx-kyc-identity-proof.component.scss',
  ],
})
export class KYCIdentityProofPageComponent implements OnInit {
  constructor(
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.renderer.addClass(this.el.nativeElement, 'kyc-form');
  }

  ngOnInit() {}

  onSubmit(): void {
    this.router.navigateByUrl('/user/kyc/selfie');
  }
}
