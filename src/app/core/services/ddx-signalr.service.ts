import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '@environments/environment';
import { CONSTANTS } from '@core/util/constants';
import { StorageService } from './ddx-storage.service';
import { ConnectivityService } from './ddx-connectivity.service';

@Injectable()
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  constructor(
    private storageService: StorageService,
    private connectivityService: ConnectivityService
  ) {}

  public startConnection(): void {
    const baseURL = environment.production
      ? CONSTANTS.SERVER_URL
      : CONSTANTS.MOCK_SERVER_URL;
    const accessToken = this.storageService.getUserAccessToken();
    const apiURL = baseURL.concat('api/live');
    const options: signalR.IHttpConnectionOptions = {
      accessTokenFactory: accessToken
        ? () => {
            return accessToken;
          }
        : undefined,
    };

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(apiURL, options)
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('---DidEx Connection started');
      })
      .catch((err) =>
        console.log('---DidEx Error while starting connection: ' + err)
      );

    this.hubConnection.onreconnecting(() => {
      console.log('---Didex Connection reconnecting ...');
      this.connectivityService.changeSignalrStatus('offline');
    });

    this.hubConnection.onreconnected(() => {
      console.log('---DidEx Connection reconnected');
      this.connectivityService.changeSignalrStatus('online');
    });
  }

  public resetConnection(): void {
    if (this.hubConnection) {
      this.hubConnection
        .stop()
        .then(() => console.log('---DidEx Connection stopped'))
        .catch((err) =>
          console.log('---DidEx Error while stopping connection: ' + err)
        );
    }

    this.startConnection();
  }

  public addDataListener(
    methodName: string,
    callbackMethod: (...args: any[]) => void
  ) {
    this.hubConnection.on(methodName, callbackMethod);
    console.log('---DidEx Listener started', methodName);
  }

  public removeDataListener(methodName: string) {
    this.hubConnection.off(methodName);
  }
}
