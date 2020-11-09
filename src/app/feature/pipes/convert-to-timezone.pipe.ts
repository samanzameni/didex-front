import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToTimezone'
})
export class ConvertToTimezonePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
