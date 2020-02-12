import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ddx-kyc-phone-verification',
  templateUrl: './ddx-kyc-phone-verification.component.html',
  styleUrls: [
    '../../../public/ddx-kyc-pages.scss',
    './ddx-kyc-phone-verification.component.scss',
  ],
})
export class KYCPhoneVerificationPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onSubmit(): void {
    this.router.navigateByUrl('/user/kyc/identity-proof');
  }
}
