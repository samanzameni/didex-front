import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services';
import { NotificationContent } from '@core/models';
import { GeneralRESTService } from '@core/services/REST';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ddx-notification-bar',
  templateUrl: './ddx-notification-bar.component.html',
  styleUrls: ['./ddx-notification-bar.component.scss'],
})
export class NotificationBarComponent implements OnInit {
  private notificationsContent: NotificationContent[];
  private _isClickedOnCTA: boolean;

  constructor(
    private authService: AuthService,
    private httpClient: GeneralRESTService,
    private toastr: ToastrService
  ) {
    this._isClickedOnCTA = false;
  }

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

  get isClickedOnCTA(): boolean {
    return this._isClickedOnCTA;
  }

  callCTA(index: number): void {
    this._isClickedOnCTA = true;
    const ntf = this.notificationsContent[index];
    this.httpClient.httpGET(ntf.buttonUrl).subscribe(
      (response) => {
        this.toastr.success('Success', ntf.title);
      },
      (errorResponse) => {
        this.toastr.error('An error occurred', ntf.title);
      }
    );
  }

  closeNotification(index: number): void {
    this.notificationsContent.splice(index, 1);
  }
}
