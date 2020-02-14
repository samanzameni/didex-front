import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TraderRESTService } from '@core/services/REST';
import { KYCPage } from '@feature/templates';

@Component({
  selector: 'ddx-kyc-selfie',
  templateUrl: './ddx-kyc-selfie.component.html',
  styleUrls: [
    '../../../public/ddx-kyc-pages.scss',
    './ddx-kyc-selfie.component.scss',
  ],
})
export class KYCSelfiePageComponent extends KYCPage implements OnInit {
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

    this.restService.requestUpdateSelfieImage(dataToSend).subscribe(
      response => {
        this.setLoadingOff();
        this.router.navigateByUrl('/user/settings');
      },
      errorResponse => {
        this.setLoadingOff();
      }
    );
  }
}
