import { InjectionToken, Provider } from '@angular/core';

/**
 * Injection Token for storage provider
 */

export const APP_DATA_STORAGE: InjectionToken<Storage> = new InjectionToken<Storage>('appDataStorage');
