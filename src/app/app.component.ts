import { Component, OnInit } from '@angular/core';
import {
  SignalRService,
  TawkToService,
  DirectionService,
  Direction,
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
    private directionService: DirectionService
  ) {}

  ngOnInit(): void {
    this.signalrService.startConnection();
  }

  get direction$(): Observable<Direction> {
    return this.directionService.direction$;
  }

  get locale$(): Observable<Locale> {
    return this.localeService.locale$;
  }
}
