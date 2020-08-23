import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ddxCreditCardMask',
})
export class CreditCardMaskPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
