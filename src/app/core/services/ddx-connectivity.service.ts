import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

export type ConnectivityStatus = 'online' | 'offline';

// window.addEventListener('online', () => console.log('came online'));
// window.addEventListener('offline', () => console.log('came offline'));

@Injectable({
  providedIn: 'root',
})
export class ConnectivityService {
  private _currentSignalrStatus: ConnectivityStatus;
  // private _currentUserStatus: ConnectivityStatus;
  private _signalrStatus$: BehaviorSubject<ConnectivityStatus>;
  // private _userStatus$: BehaviorSubject<ConnectivityStatus>;

  private _refresherSignal$: Subject<boolean>;

  constructor() {
    this._signalrStatus$ = new BehaviorSubject('offline');
    // this._userStatus$ = new BehaviorSubject('offline');
    this._refresherSignal$ = new Subject();
  }

  get signalrStatus$(): Observable<ConnectivityStatus> {
    return this._signalrStatus$.asObservable();
  }

  get refresherSignal$(): Observable<boolean> {
    return this._refresherSignal$.asObservable();
  }

  get currentSignalrStatus(): ConnectivityStatus {
    return this._currentSignalrStatus;
  }

  public changeSignalrStatus(newStatus: ConnectivityStatus): void {
    if (this._currentSignalrStatus === 'offline' && newStatus === 'online') {
      this._refresherSignal$.next(true);
    }
    this._currentSignalrStatus = newStatus;
    this._signalrStatus$.next(this._currentSignalrStatus);
  }
}
