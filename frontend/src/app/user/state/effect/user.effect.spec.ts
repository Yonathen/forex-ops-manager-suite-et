import { TestBed } from '@angular/core/testing';

import { UserEffect } from './user.effect';

describe('UserEffectsService', () => {
  let service: UserEffect;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserEffect);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
