import { Injectable } from '@angular/core';

import * as en_locale from '@locale/en';
import * as zh_locale from '@locale/zh';
import * as ru_locale from '@locale/ru';
import * as fa_locale from '@locale/fa';

import { StorageService } from './ddx-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

export type Locale = 'en' | 'zh' | 'ru' | 'fa';
export type LocaleModel = {
  locale: Locale;
  caption: string;
};

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private _locale$: BehaviorSubject<Locale>;
  private locale: Locale;
  private localeModels: LocaleModel[];

  private currentActiveLocale: LocaleModel;

  constructor(private storageService: StorageService) {
    let defaultLocale;

    if (this.isOnLocalhost()) {
      this.localeModels = [
        { locale: 'en', caption: 'English' },
        { locale: 'zh', caption: '中文' },
        { locale: 'ru', caption: 'русский' },
        { locale: 'fa', caption: 'فارسی' },
      ];

      defaultLocale = 'en';
    } else if (this.isOnRegionTwo()) {
      this.localeModels = [
        // { locale: 'en', caption: 'English' },
        // { locale: 'zh', caption: '中文' },
        // { locale: 'ru', caption: 'русский' },
        { locale: 'fa', caption: 'فارسی' },
      ];

      defaultLocale = 'fa';
    } else {
      this.localeModels = [
        { locale: 'en', caption: 'English' },
        { locale: 'zh', caption: '中文' },
        { locale: 'ru', caption: 'русский' },
        // { locale: 'fa', caption: 'فارسی' },
      ];

      defaultLocale = 'en';
    }

    // const defaultLocale =
    //   this.storageService.getStoredLocale() ||
    //   (this.isOnRegionTwo() ? 'fa' : 'en');

    this.changeLocale(defaultLocale, true);
    this._locale$ = new BehaviorSubject(this.locale);
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

  get locale$(): Observable<Locale> {
    return this._locale$.asObservable();
  }

  public changeLocale(
    newLocale: Locale,
    shouldSaveOnStorage: boolean = false
  ): void {
    this.locale = newLocale;

    if (shouldSaveOnStorage) {
      this.storageService.setStoredLocale(newLocale);
    }

    for (const l of this.availableLocales) {
      if (l.locale === newLocale) {
        this.currentActiveLocale = l;
        break;
      }
    }
  }

  public isOnLocalhost(): boolean {
    return window.location.hostname.startsWith('localhost');
  }

  public isOnRegionTwo(): boolean {
    return window.location.hostname.endsWith('.ir');
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
        case 'zh':
          localeFile = zh_locale[decodedMessageID.messageSection];
          break;
        case 'fa':
          localeFile = fa_locale[decodedMessageID.messageSection];
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
