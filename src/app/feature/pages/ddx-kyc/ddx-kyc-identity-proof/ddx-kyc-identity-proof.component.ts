import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { KYCPageDirective } from '@feature/templates';
import { FormBuilder, Validators } from '@angular/forms';
import { TraderRESTService } from '@core/services/REST';
import { TraderService, AuthService } from '@core/services';

@Component({
  selector: 'ddx-kyc-identity-proof',
  templateUrl: './ddx-kyc-identity-proof.component.html',
  styleUrls: [
    '../../../public/ddx-kyc-pages.scss',
    './ddx-kyc-identity-proof.component.scss',
  ],
})
export class KYCIdentityProofPageComponent extends KYCPageDirective
  implements OnInit {
  private isLoadingImage: boolean;

  constructor(
    protected router: Router,
    protected el: ElementRef,
    protected renderer: Renderer2,
    protected formBuilder: FormBuilder,
    protected traderService: TraderService,
    private restService: TraderRESTService,
    private authService: AuthService
  ) {
    super(router, el, renderer, formBuilder, traderService);
    this.renderer.addClass(this.el.nativeElement, 'kyc-form');
  }

  ngOnInit() {
    this.buildForm();

    this.isLoadingImage = true;
    this.traderService.updateCurrentTraderKYCImages().subscribe((response) => {
      this.isLoadingImage = false;
      this.buildForm();
    });
  }

  get isLoading(): boolean {
    return this.isLoadingImage;
  }

  private buildForm(): void {
    const images = this.traderService.currentTraderKYCImages;
    let img = '';
    if (images && images.length > 0) {
      const identityImage = images.find((image) => image.imageType === 1);
      if (identityImage) {
        img = identityImage.image;
      }
    }

    this.kycForm = this.formBuilder.group({
      image: [img, Validators.required],
    });
  }

  get isTraderInRegionTwo(): boolean {
    return this.authService.decodedToken?.region === '2';
  }

  onSubmit(): void {
    this.setLoadingOn();

    const dataToSend = this.kycForm.value;

    this.restService.requestUpdateIdentityImage(dataToSend).subscribe(
      (response) => {
        this.setLoadingOff();
        this.router.navigateByUrl('/user/kyc/selfie');
      },
      (errorResponse) => {
        this.setLoadingOff();
      }
    );
  }
}
