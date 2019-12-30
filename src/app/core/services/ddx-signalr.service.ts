import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { environment } from '@environments/environment';
import { CONSTANTS } from '@core/util/constants';

/**
 * SignalRService handles all the things about web socket connections
 *
 * @author Azad Kavian
 */
@Injectable()
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  private apiURL: string;

  constructor() {
    const baseURL = environment.production
      ? CONSTANTS.SERVER_URL
      : CONSTANTS.MOCK_SERVER_URL;
    this.apiURL = baseURL.concat('api/signalr');
  }

  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.apiURL)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  private addDataListener(
    methodName: string,
    callbackMethod: (...args: any[]) => void
  ) {
    this.hubConnection.on(methodName, callbackMethod);
  }
}
