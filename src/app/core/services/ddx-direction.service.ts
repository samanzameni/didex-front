import { Injectable } from '@angular/core';
import { StorageService } from './ddx-storage.service';
import { LocaleService } from './ddx-locale.service';
import { Observable, BehaviorSubject } from 'rxjs';

export type Direction = 'rtl' | 'ltr';

@Injectable({
  providedIn: 'root',
})
export class DirectionService {
  private _currentDirection: Direction;
  private _direction$: BehaviorSubject<Direction>;

  constructor(
    private storageService: StorageService,
    private localeService: LocaleService
  ) {
    this._direction$ = new BehaviorSubject('ltr');
    localeService.locale$.subscribe((currentLocale) => {
      this._currentDirection =
        localeService.currentLocale === 'fa' ? 'rtl' : 'ltr';
      this._direction$.next(this._currentDirection);
    });
  }

  get direction$(): Observable<Direction> {
    return this._direction$.asObservable();
  }

  get currentDirection(): Direction {
    return this._currentDirection;
  }

  public changeDirection(newDirection: Direction): void {
    this._currentDirection = newDirection;
    this._direction$.next(this._currentDirection);
  }
}
