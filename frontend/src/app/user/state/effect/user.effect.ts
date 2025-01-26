import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { UserDto, UserPublicDto } from '../../../../../api';
import { loadCurrentUserCompleted } from '../../../shared/state/action/global.actions';
import { UserService } from '../../service/user.service';
import { updateUser } from '../action/user.action';

@Injectable()
export class UserEffect {
  private actions$ = inject(Actions);

  constructor(
    private userService: UserService
  ) { }

  loadCurrentUser$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(updateUser),
      exhaustMap((action) => {
        return this.userService.updateUser(action.updatedUser as UserDto).pipe(
          map((user) => loadCurrentUserCompleted({ currentUser: { user: user as UserPublicDto, loading: false } })),
          catchError((error) => of(loadCurrentUserCompleted({ currentUser: { loading: false, error }})))
        )
      })
    )
  })
}
