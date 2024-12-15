import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { GlobalText } from './data/text';
import { Globalurl } from './data/url';
import { provideHttpClient  } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
    GlobalText,
    Globalurl,
    provideHttpClient(),
  ]
};
