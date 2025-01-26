import { TestBed } from '@angular/core/testing';

import { CurrentUserEffect } from './current-user.effect';

describe('CurrentUserEffectService', () => {
  let service: CurrentUserEffect;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentUserEffect);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
