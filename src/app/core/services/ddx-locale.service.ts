import { Injectable, ApplicationRef } from '@angular/core';

import * as en_locale from '@locale/en';
import * as cn_locale from '@locale/cn';
import * as ru_locale from '@locale/ru';
import { StorageService } from './ddx-storage.service';

export type Locale = 'en' | 'cn' | 'ru';
export type LocaleModel = {
  locale: Locale;
  caption: string;
};

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private locale: Locale;
  private localeModels: LocaleModel[];

  private currentActiveLocale: LocaleModel;

  constructor(private storageService: StorageService) {
    this.localeModels = [
      { locale: 'en', caption: 'English' },
      { locale: 'cn', caption: '中文' },
      { locale: 'ru', caption: 'русский' },
    ];

    this.changeLocale(this.storageService.getStoredLocale() || 'en');
  }

  get currentLocale(): Locale {
    return this.locale;
  }

  get currentLocaleModel(): LocaleModel {
    return this.currentActiveLocale;
  }

  get availableLocales(): LocaleModel[] {
    return this.localeModels;
  }

  public changeLocale(newLocale: Locale): void {
    this.locale = newLocale;
    this.storageService.setStoredLocale(newLocale);

    for (const l of this.availableLocales) {
      if (l.locale === newLocale) {
        this.currentActiveLocale = l;
        break;
      }
    }
  }

  /*
    message ID valid formats are: section.code, section.subsection.code
  */
  public getMessage(messageID: string): string {
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
        case 'ru':
          localeFile = ru_locale[decodedMessageID.messageSection];
          break;
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

      if (!message || message.length === 0) {
        throw 'noTranslation';
      }

      return message;
    } catch (error) {
      if (this.locale !== 'en') {
        try {
          const localeFile = en_locale[decodedMessageID.messageSection];
          let message = decodedMessageID.messageSubSection
            ? localeFile[decodedMessageID.messageSubSection][
                decodedMessageID.messageCode
              ]
            : localeFile[decodedMessageID.messageCode];

          if (!message || message.length === 0) {
            throw 'noTranslation';
          }

          return message;
        } catch (fallbackError) {
          console.warn(
            'Translation not found in',
            decodedMessageID.messageSection
          );
          return '';
        }
      }
    }
    return '';
  }
}
