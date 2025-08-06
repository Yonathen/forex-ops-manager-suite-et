import { TestBed } from '@angular/core/testing';

import { GlobalEffect } from './global.effect';

describe('CurrentUserEffectService', () => {
  let service: GlobalEffect;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalEffect);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
