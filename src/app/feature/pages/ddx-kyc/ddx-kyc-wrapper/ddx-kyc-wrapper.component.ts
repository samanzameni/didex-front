import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  Renderer2,
  AfterViewChecked,
} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ddx-kyc-wrapper',
  templateUrl: './ddx-kyc-wrapper.component.html',
  styleUrls: ['./ddx-kyc-wrapper.component.scss'],
})
export class KYCWrapperPageComponent implements OnInit, AfterViewChecked {
  @ViewChildren('step') steps: QueryList<ElementRef>;

  private currentStepIndex: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const landingStep: string = this.route.firstChild.routeConfig.path;
    this.currentStepIndex = this.getStepNameToIndex(landingStep);

    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(event => {
        this.currentStepIndex = this.getStepNameToIndex(
          this.route.firstChild.routeConfig.path
        );
        this.updateStepsStyles();
      });
  }

  ngAfterViewChecked(): void {
    this.updateStepsStyles();
  }

  private updateStepsStyles(): void {
    if (this.steps) {
      this.steps.toArray().forEach((step, i) => {
        if (i < this.currentStepIndex) {
          this.renderer.removeClass(step.nativeElement, 'active');
          this.renderer.addClass(step.nativeElement, 'passed');
        } else if (i === this.currentStepIndex) {
          this.renderer.addClass(step.nativeElement, 'active');
          this.renderer.removeClass(step.nativeElement, 'passed');
        } else {
          this.renderer.removeClass(step.nativeElement, 'active');
          this.renderer.removeClass(step.nativeElement, 'passed');
        }
      });
    }
  }

  private getStepNameToIndex(name: string): number {
    switch (name) {
      case 'personal-information':
        return 0;
      case 'phone-verification':
        return 1;
      case 'identity-proof':
        return 2;
      case 'selfie':
        return 3;
      case 'done':
        return 4;
      default:
        return 0;
    }
  }
}
