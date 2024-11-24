import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { Amplify } from 'aws-amplify';

// Importação condicional do outputs
let outputs = {};
try {
  outputs = require('../../amplify_outputs.json');
} catch (e) {
  console.warn('Amplify outputs file not found. Make sure to run "amplify push" first.');
}

Amplify.configure(outputs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
