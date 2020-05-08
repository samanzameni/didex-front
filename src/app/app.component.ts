import { Component, OnInit } from '@angular/core';
import { SignalRService } from '@core/services';
import { LocaleService } from '@core/services/ddx-locale.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private signalrService: SignalRService,
    private localeService: LocaleService
  ) {}

  ngOnInit(): void {
    this.signalrService.startConnection();
  }
}
