import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ThemeService } from './shared/services/theme.service';
import { UserService } from './shared/services/user.service';
import { ResponsiveService } from './shared/services/responsive.service';
import { AuthService } from './shared/services/auth.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { KspinnerService } from './shared/utils/kspinner/kspinner.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()), 
    provideRouter(routes), 
    provideAnimationsAsync(),
    ThemeService,
    UserService,
    ResponsiveService,
    AuthService,
    KspinnerService
  ]
};
