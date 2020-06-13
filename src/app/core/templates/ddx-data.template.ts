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

  private getPageParam(...params: any[]): number {
    const pageParams = params.filter((param) =>
      Object.keys(param).includes('page')
    );
    if (pageParams && pageParams.length > 0) {
      return pageParams[0].page;
    }

    return -1; // NOT FOUND
  }

  protected turnOnLoading() {
    this.isLoading.next(true);
  }

  protected turnOffLoading() {
    this.isLoading.next(false);
  }

  protected handleAuthError(noRedirect: boolean): void {
    this.authService.handleAuthError(noRedirect);
  }

  public resetDataStream(): void {
    this.dataStream = new BehaviorSubject(null);
  }

  public updateData(...params) {
    this.turnOnLoading();
    this.queryEngine(...params).subscribe(
      (response) => {
        if (
          response === null ||
          response === undefined ||
          (Array.isArray(response) && (response as Array<any>).length === 0)
        ) {
        } else {
          const page = this.getPageParam(...params);
          const isCumulative = page > 1;
          let dataToSend = response;

          if (isCumulative) {
            dataToSend = (this.dataStream$.value as any).concat(response);
          }
          this.dataStream$.next(dataToSend);
        }
        this.turnOffLoading();
      },
      (error) => {
        if (error.status && error.status === 401) {
          this.handleAuthError(true);
        }
      }
    );
  }

  public updateDataWithDebounceTime(milis: number, ...params) {
    this.turnOnLoading();
    this.queryEngine(...params)
      .pipe(debounceTime(milis))
      .subscribe(
        (response) => {
          if (response === null && response === undefined) {
          } else {
            this.dataStream$.next(response);
          }
          this.turnOffLoading();
        },
        (error) => {
          if (error.status && error.status === 401) {
            this.handleAuthError(true);
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
