import { Injectable } from '@angular/core';

import { StorageService } from './ddx-storage.service';
import { AuthService } from './ddx-auth.service';

declare var Tawk_API: any;

@Injectable()
export class TawkToService {
  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {
    (() => {
      const scriptElement = document.createElement('script');
      scriptElement.async = true;
      scriptElement.src =
        'https://embed.tawk.to/5ed63cb79e5f6944228fb763/default';
      // tslint:disable-next-line: deprecation
      scriptElement.charset = 'UTF-8';
      scriptElement.setAttribute('crossorigin', '*');
      document.getElementsByTagName('body')[0].appendChild(scriptElement);

      scriptElement.onload = () => {
        Tawk_API = Tawk_API || {};
        // tslint:disable-next-line: variable-name
        const Tawk_LoadStart = new Date();
        console.log('===TAWK.TO SCRIPT Loaded');

        if (authService.isAuthorized) {
          Tawk_API.setAttributes(
            {
              name: authService.decodedToken.nameid || 'Trader',
              email: authService.decodedToken.email,
            },
            (error) => {}
          );
        }
      };
    })();
  }
}
