import { NgModule } from '@angular/core';
import { CreditCardMaskPipe } from '@feature/pipes/ddx-credit-card-mask.pipe';

@NgModule({
  declarations: [CreditCardMaskPipe],
  exports: [CreditCardMaskPipe],
  providers: [CreditCardMaskPipe],
})
export class CreditCardMaskPipeModule {}
