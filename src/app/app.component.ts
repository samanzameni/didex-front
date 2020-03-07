import { Component, OnInit } from '@angular/core';
import { SignalRService } from '@core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private signalrService: SignalRService) {}

  ngOnInit(): void {
    this.signalrService.startConnection();
  }
}
