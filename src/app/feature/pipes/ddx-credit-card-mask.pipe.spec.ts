import { CreditCardMaskPipe } from './ddx-credit-card-mask.pipe';

describe('CreditCardMaskPipe', () => {
  it('create an instance', () => {
    const pipe = new CreditCardMaskPipe();
    expect(pipe).toBeTruthy();
  });
});
