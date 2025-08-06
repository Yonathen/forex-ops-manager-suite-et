import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { BranchEffect } from './branch/state/effect/branch.effect';
import { branchReducer } from './branch/state/reducer/branch.reducer';
import { MyPreset } from './my-preset';
import { AppStorage } from './shared/model/AppStorage';
import { APP_DATA_STORAGE } from './shared/provider/storage';
import { JwtInterceptor } from './shared/service/jwt-interceptor.service';
import { GlobalEffect } from './shared/state/effect/global.effect';
import { globalReducer } from './shared/state/reducer/global.reducer';
import { UserEffect } from './user/state/effect/user.effect';
import { useReducer } from './user/state/reducer/user.reducer';
import {customersReducer} from './customer/state/reducer/customer.reducer';
import {CustomerEffect} from './customer/state/effect/customer.effect';

export function appStorageFactory(): AppStorage {
  return new AppStorage(sessionStorage, localStorage);
}

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
        provide: APP_DATA_STORAGE,
        useFactory: appStorageFactory
    },
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    providePrimeNG({
        theme: {
            preset: MyPreset,
            options: {
                darkModeSelector: false || 'none'
            }
        }
    }),
    provideStore({
      customer: customersReducer,
      branch: branchReducer,
      global: globalReducer,
      user: useReducer
    }),
    provideEffects([
        GlobalEffect,
        UserEffect,
        BranchEffect,
        CustomerEffect,
    ]),
    provideStoreDevtools({
        maxAge: 25, // Retains last 25 states
        logOnly: !isDevMode(), // Restrict extension to log-only mode
        autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
        traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
        connectInZone: true // If set to true, the connection is established within the Angular zone
    })
]
};
