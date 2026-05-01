import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const provideTranslations = () => [
  provideTranslateService({
    defaultLanguage: 'es'
  }),
  provideTranslateHttpLoader({
    prefix: './assets/i18n/',
    suffix: '.json'
  })
];
