import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '@environments/environment';
import { CONSTANTS } from '@core/util/constants';
import { StorageService } from './ddx-storage.service';

@Injectable()
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  private apiURL: string;
  private options: signalR.IHttpConnectionOptions;

  constructor(private storageService: StorageService) {
    const baseURL = environment.production
      ? CONSTANTS.SERVER_URL
      : CONSTANTS.MOCK_SERVER_URL;
    const accessToken = this.storageService.getUserAccessToken();

    this.apiURL = baseURL.concat('api/live');

    this.options = {
      accessTokenFactory: () => {
        return accessToken;
      },
    };
  }

  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.apiURL, this.options)
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() =>
        console.log('-----------------------DidEx Connection started')
      )
      .catch(err =>
        console.log(
          '-----------------------DidEx Error while starting connection: ' + err
        )
      );
  }

  public addDataListener(
    methodName: string,
    callbackMethod: (...args: any[]) => void
  ) {
    this.hubConnection.on(methodName, callbackMethod);
    console.log('-----------------------DidEx Listener started', methodName);
  }

  public removeDataListener(methodName: string) {
    this.hubConnection.off(methodName);
  }
}
