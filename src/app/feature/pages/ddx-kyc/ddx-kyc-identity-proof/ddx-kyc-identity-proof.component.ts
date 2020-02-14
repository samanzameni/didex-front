import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { KYCPage } from '@feature/templates';
import { FormBuilder, Validators } from '@angular/forms';
import { TraderRESTService } from '@core/services/REST';

@Component({
  selector: 'ddx-kyc-identity-proof',
  templateUrl: './ddx-kyc-identity-proof.component.html',
  styleUrls: [
    '../../../public/ddx-kyc-pages.scss',
    './ddx-kyc-identity-proof.component.scss',
  ],
})
export class KYCIdentityProofPageComponent extends KYCPage implements OnInit {
  constructor(
    protected router: Router,
    protected el: ElementRef,
    protected renderer: Renderer2,
    protected formBuilder: FormBuilder,
    private restService: TraderRESTService
  ) {
    super(router, el, renderer, formBuilder);
    this.renderer.addClass(this.el.nativeElement, 'kyc-form');
  }

  ngOnInit() {
    this.kycForm = this.formBuilder.group({
      image: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.setLoadingOn();

    const dataToSend = this.kycForm.value;

    this.restService.requestUpdateIdentityImage(dataToSend).subscribe(
      response => {
        this.setLoadingOff();
        this.router.navigateByUrl('/user/kyc/selfie');
      },
      errorResponse => {
        this.setLoadingOff();
      }
    );
  }
}
