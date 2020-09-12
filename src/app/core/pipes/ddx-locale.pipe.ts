import { Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from '@core/services/ddx-locale.service';

@Pipe({
  name: 'ddxLocale',
})
export class LocalePipe implements PipeTransform {
  constructor(private localeService: LocaleService) {}

  transform(value: string, ...args: unknown[]): string {
    return this.localeService.getMessage(value);
  }
}
