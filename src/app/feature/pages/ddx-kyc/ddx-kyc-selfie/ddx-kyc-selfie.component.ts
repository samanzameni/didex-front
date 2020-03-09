import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TraderRESTService } from '@core/services/REST';
import { KYCPageDirective } from '@feature/templates';
import { TraderService } from '@core/services';

@Component({
  selector: 'ddx-kyc-selfie',
  templateUrl: './ddx-kyc-selfie.component.html',
  styleUrls: [
    '../../../public/ddx-kyc-pages.scss',
    './ddx-kyc-selfie.component.scss',
  ],
})
export class KYCSelfiePageComponent extends KYCPageDirective implements OnInit {
  constructor(
    protected router: Router,
    protected el: ElementRef,
    protected renderer: Renderer2,
    protected formBuilder: FormBuilder,
    protected traderService: TraderService,
    private restService: TraderRESTService
  ) {
    super(router, el, renderer, formBuilder, traderService);
    this.renderer.addClass(this.el.nativeElement, 'kyc-form');
  }

  ngOnInit() {
    const trader = this.currentTrader;
    let img = '';
    if (trader.kycImages && trader.kycImages.length > 0) {
      const identityImage = trader.kycImages.find(
        image => image.imageType === 2
      );
      if (identityImage) {
        img = identityImage.image;
      }
    }

    this.kycForm = this.formBuilder.group({
      image: [img, Validators.required],
    });
  }

  onSubmit(): void {
    this.setLoadingOn();

    const dataToSend = this.kycForm.value;

    this.restService.requestUpdateSelfieImage(dataToSend).subscribe(
      response => {
        this.setLoadingOff();
        this.router.navigateByUrl('/user/kyc/done');
      },
      errorResponse => {
        this.setLoadingOff();
      }
    );
  }
}
