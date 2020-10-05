import { Injectable } from '@angular/core';

@Injectable()
export class HotjarService {
  constructor() {
    if (
      window.location.hostname.endsWith('.ir') ||
      window.location.hostname.startsWith('localhost')
    ) {
      ((h: any, o, t, j, a, r) => {
        h.hj =
          h.hj ||
          // tslint:disable-next-line: only-arrow-functions
          function () {
            (h.hj.q = h.hj.q || []).push(arguments);
          };
        h._hjSettings = { hjid: 2015872, hjsv: 6 };
        a = o.getElementsByTagName('head')[0];
        r = o.createElement('script');
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
        console.log('===HOTJAR SCRIPT Loaded');
      })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
    }
  }
}
