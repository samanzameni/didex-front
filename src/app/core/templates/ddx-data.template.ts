import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { AuthService } from '@core/services';
import { debounceTime } from 'rxjs/operators';

export abstract class AbstractDATAService<T> {
  private isLoading: Subject<boolean>;

  private dataStream: BehaviorSubject<T>;
  protected queryEngine: (...params) => Observable<T>;

  constructor(protected authService: AuthService) {
    this.isLoading = new Subject();
    this.dataStream = new BehaviorSubject(null);
  }

  protected turnOnLoading() {
    this.isLoading.next(true);
  }

  protected turnOffLoading() {
    this.isLoading.next(false);
  }

  protected handleAuthError(): void {
    this.authService.handleAuthError();
  }

  public resetDataStream(): void {
    this.dataStream = new BehaviorSubject(null);
  }

  public updateData(...params) {
    this.turnOnLoading();
    this.queryEngine(...params).subscribe(
      response => {
        if (response === null && response === undefined) {
        } else {
          this.dataStream$.next(response);
        }
        this.turnOffLoading();
      },
      error => {
        if (error.status && error.status === 401) {
          // this.handleAuthError(); TODO
        }
      }
    );
  }

  public updateDataWithDebounceTime(milis: number, ...params) {
    this.turnOnLoading();
    this.queryEngine(...params)
      .pipe(debounceTime(milis))
      .subscribe(
        response => {
          if (response === null && response === undefined) {
          } else {
            this.dataStream$.next(response);
          }
          this.turnOffLoading();
        },
        error => {
          if (error.status && error.status === 401) {
            // this.handleAuthError(); TODO
          }
        }
      );
  }

  public updateFeed(...params): void {}

  get dataStream$(): BehaviorSubject<T> {
    return this.dataStream;
  }

  get isLoading$(): Subject<boolean> {
    return this.isLoading;
  }
}
