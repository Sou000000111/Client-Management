import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { withRouterConfig } from '@angular/router';
bootstrapApplication(App, {
  providers: [
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' }))
  ]
});
