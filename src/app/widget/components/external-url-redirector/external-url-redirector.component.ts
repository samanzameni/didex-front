import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'external-url-redirector',
  templateUrl: './external-url-redirector.component.html',
  styleUrls: ['./external-url-redirector.component.scss'],
})
export class ExternalUrlRedirectorComponent implements OnInit, OnDestroy {
  private paramSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.paramSubscription = this.route.queryParams.subscribe((params) => {
      const url = params.from
        ? params.redirect_url.concat(`?from=${params.from}`)
        : params.redirect_url;
      window.open(url, '_self');
    });
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}
