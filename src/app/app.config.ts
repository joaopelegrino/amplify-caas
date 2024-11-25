import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AIService } from './services/ai.service';
import { StateService } from './services/state.service';
import { ConfigService } from './services/config.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    ConfigService,
    AIService,
    StateService
  ]
};
