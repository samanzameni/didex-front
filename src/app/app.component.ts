import { Component, OnInit } from '@angular/core';
import {
  SignalRService,
  TawkToService,
  DirectionService,
  Direction,
  HotjarService,
} from '@core/services';
import { LocaleService, Locale } from '@core/services/ddx-locale.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private signalrService: SignalRService,
    private localeService: LocaleService,
    private tawkToService: TawkToService,
    private hotjarService: HotjarService,
    private directionService: DirectionService
  ) {}

  ngOnInit(): void {
    this.signalrService.startConnection();

    const body = document.querySelector('body');
    this.directionService.direction$.subscribe((dir) => {
      body.setAttribute('dir', dir);
    });

    this.localeService.locale$.subscribe((locale) => {
      body.classList.value = locale;
    });
  }
}
