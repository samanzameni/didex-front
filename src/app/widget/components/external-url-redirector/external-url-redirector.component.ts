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
      const url =
        params.from && params.from !== '/'
          ? params.redirect_url.concat(`?from=${params.from}`)
          : params.redirect_url;

      this.redirectTo(url);
    });
  }

  redirectTo(url: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.style.width = '1px';
    link.style.height = '1px';
    link.style.position = 'fixed';
    link.style.top = '0';
    link.style.left = '0';
    link.target = '_self';
    document.getElementsByTagName('body')[0].appendChild(link);
    link.click();
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}
