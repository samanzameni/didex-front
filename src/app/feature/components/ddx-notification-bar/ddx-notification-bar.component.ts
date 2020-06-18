import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services';
import { NotificationContent } from '@core/models';

@Component({
  selector: 'ddx-notification-bar',
  templateUrl: './ddx-notification-bar.component.html',
  styleUrls: ['./ddx-notification-bar.component.scss'],
})
export class NotificationBarComponent implements OnInit {
  private notificationsContent: NotificationContent[];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isAuthorized) {
      this.authService.requestGetNotifications().subscribe((response) => {
        this.notificationsContent = Array.from(response);
      });
    }
  }

  get notifications(): NotificationContent[] {
    return this.notificationsContent || [];
  }
}
