import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideAnimationsAsync(),
              provideHttpClient(withInterceptorsFromDi()),
              {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptor,
                multi: true
              }]
};

// export const appConfig: ApplicationConfig = {
  // providers: [provideRouter(routes),
//               provideAnimationsAsync(),
//               provideHttpClient(withInterceptors([AuthInterceptor])),
//   ],
// };
