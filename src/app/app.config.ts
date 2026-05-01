import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTranslations } from './core/config/translate.config';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { CustomPaginatorIntl } from './core/config/paginator-intl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    ...provideTranslations(),
    provideHttpClient(withInterceptors([httpInterceptor])), provideAnimationsAsync(),
    {
      provide: MatPaginatorIntl,
      useFactory: (translate: TranslateService) =>
        new CustomPaginatorIntl(translate),
      deps: [TranslateService]
    }
  ]
};
