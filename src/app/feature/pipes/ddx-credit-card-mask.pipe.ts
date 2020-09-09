import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ddxCreditCardMask',
})
export class CreditCardMaskPipe implements PipeTransform {
  transform(cardNumber: string): string {
    return cardNumber.replace(/\s+/g, '').replace(/(\d{4})(?=\d{4})/g, '$1-');
    // .trim();
  }
}
