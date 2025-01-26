import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { UserService } from '../../../user/service/user.service';
import { loadCurrentUser, loadCurrentUserCompleted } from '../action/global.actions';

@Injectable()
export class CurrentUserEffect {
  private actions$ = inject(Actions);

  constructor(
    private userService: UserService
  ) { }

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

}
