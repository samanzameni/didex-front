import { Injectable } from '@angular/core';

import * as en_locale from '@locale/en';
import * as cn_locale from '@locale/cn';

export type Locale = 'en' | 'cn';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private locale: Locale;

  constructor() {
    this.locale = 'en';
  }

  get currentLocale(): Locale {
    return this.locale;
  }

  public changeLocale(newLocale: Locale): void {
    this.locale = newLocale;
  }

  /*
    message ID valid formats are: section.code, section.subsection.code
  */
  public getMessage(messageID: string): string | string[] {
    if (!messageID || messageID.length === 0) {
      return '';
    }

    const splitedMessage: string[] = messageID
      .split('.')
      .filter((part) => part.length > 0);

    let decodedMessageID: {
      messageSection: string;
      messageSubSection?: string;
      messageCode: string;
    };
    switch (splitedMessage.length) {
      case 0:
      case 1:
        return '';
      case 2:
        decodedMessageID = {
          messageSection: splitedMessage[0],
          messageCode: splitedMessage[1],
        };
        break;
      case 3:
        decodedMessageID = {
          messageSection: splitedMessage[0],
          messageSubSection: splitedMessage[1],
          messageCode: splitedMessage[2],
        };
        break;
    }

    try {
      let localeFile;
      switch (this.locale) {
        case 'cn':
          localeFile = cn_locale[decodedMessageID.messageSection];
          break;
        case 'en':
        default:
          localeFile = en_locale[decodedMessageID.messageSection];
      }

      const message = decodedMessageID.messageSubSection
        ? localeFile[decodedMessageID.messageSubSection][
            decodedMessageID.messageCode
          ]
        : localeFile[decodedMessageID.messageCode];
      return message;
    } catch (error) {
      console.warn('Translation not found in', decodedMessageID.messageSection);
      return '';
    }
    return '';
  }
}
