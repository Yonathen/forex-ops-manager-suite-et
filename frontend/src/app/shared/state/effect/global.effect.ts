import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import {ExchangeRateDto, UserDto, UserPublicDto} from '../../../../../api';
import { UserService } from '../../../user/service/user.service';
import {
  createExchangeRateDetail,
  createExchangeRateDetailCompleted,
  fetchAllExchangeRates, fetchAllExchangeRatesCompleted,
  fetchExchangeRateById,
  fetchExchangeRateByIdCompleted,
  loadCurrentUser,
  loadCurrentUserCompleted,
  removeExchangeRateDetail,
  removeExchangeRateDetailCompleted,
  updateCurrentUser,
  updateExchangeRateDetail,
  updateExchangeRateDetailCompleted
} from '../action/global.actions';
import {ExchangeRateService} from '../../service/exchange-rate.service';

@Injectable()
export class GlobalEffect {
  private actions$ = inject(Actions);

  constructor(
    private userService: UserService,
    private exchangeRateService: ExchangeRateService,
  ) { }

  updateCurrentUser$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(updateCurrentUser),
      exhaustMap((action) => {
        return this.userService.updateUser(action.updatedUser as UserDto).pipe(
          map((user) => loadCurrentUserCompleted({ currentUser: { user: user as UserPublicDto, loading: false } })),
          catchError((error) => of(loadCurrentUserCompleted({ currentUser: { loading: false, error }})))
        )
      })
    )
  })

  loadCurrentUser$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(loadCurrentUser),
      exhaustMap((action) => {
        console.log("loadCurrentUser", { action })
        return this.userService.getUser(action.id).pipe(
          map((user) => loadCurrentUserCompleted({ currentUser: { user, loading: false } })),
          catchError((error) => of(loadCurrentUserCompleted({ currentUser: { loading: false, error }})))
        )
      })
    )
  })

  createExchangeRateDetail$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(createExchangeRateDetail),
      exhaustMap((action) => {
        console.log({ action })
        return this.exchangeRateService.createExchangeRate(action.createdExchangeRate as ExchangeRateDto).pipe(
          map((exchangeRate) => createExchangeRateDetailCompleted({ exchangeRateDetail: { data: exchangeRate, loading: false } })),
          catchError((error) => of(createExchangeRateDetailCompleted({ exchangeRateDetail: { loading: false, error }})))
        )
      })
    )
  })

  removeExchangeRateDetail$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(removeExchangeRateDetail),
      exhaustMap((action) => {
        return this.exchangeRateService.removeExchangeRate(action.removedExchangeRate as ExchangeRateDto).pipe(
          map((exchangeRate) => removeExchangeRateDetailCompleted({ exchangeRateDetail: { data: exchangeRate, loading: false } })),
          catchError((error) => of(removeExchangeRateDetailCompleted({ exchangeRateDetail: { loading: false, error }})))
        )
      })
    )
  })

  updateExchangeRateDetail$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(updateExchangeRateDetail),
      exhaustMap((action) => {
        return this.exchangeRateService.updateExchangeRate(action.updatedExchangeRate as ExchangeRateDto).pipe(
          map((exchangeRate) => updateExchangeRateDetailCompleted({ exchangeRateDetail: { data: exchangeRate, loading: false } })),
          catchError((error) => of(updateExchangeRateDetailCompleted({ exchangeRateDetail: { loading: false, error }})))
        )
      })
    )
  })

  fetchExchangeRateById$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(fetchExchangeRateById),
      exhaustMap((action) => {
        return this.exchangeRateService.getExchangeRate(action.id).pipe(
          map((exchangeRate) => fetchExchangeRateByIdCompleted({ exchangeRateDetail: { data: exchangeRate, loading: false } })),
          catchError((error) => of(fetchExchangeRateByIdCompleted({ exchangeRateDetail: { loading: false, error }})))
        )
      })
    )
  })

  fetchAllExchangeRates$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(fetchAllExchangeRates),
      exhaustMap((action) => {
        return this.exchangeRateService.fetchAllExchangeRates(action.page, action.size).pipe(
          map((data) => fetchAllExchangeRatesCompleted({ allExchangeRates: { loading: false, data } })),
          catchError((error) => of(fetchAllExchangeRatesCompleted({ allExchangeRates: { loading: false, error }})))
        )
      })
    )
  })

}
