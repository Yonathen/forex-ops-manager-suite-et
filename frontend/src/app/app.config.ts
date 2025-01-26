import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { MyPreset } from './my-preset';
import { AppStorage } from './shared/model/AppStorage';
import { APP_DATA_STORAGE } from './shared/provider/storage';
import { JwtInterceptor } from './shared/service/jwt-interceptor.service';
import { CurrentUserEffect } from './shared/state/effect/current-user.effect';
import { globalReducer } from './shared/state/reducer/global.reducer';
import { UserEffect } from './user/state/effect/user.effect';
import { useReducer } from './user/state/reducer/user.reducer';

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
        global: globalReducer,
        user: useReducer
    }),
    provideEffects([
        CurrentUserEffect,
        UserEffect
    ])
]
};
