import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { UserDto, UserPublicDto } from '../../../../../api';
import { UserService } from '../../service/user.service';
import {
  addRoleToUser,
  addRoleToUserCompleted,
  fetchAllRoles,
  fetchAllRolesCompleted,
  fetchAllUsers,
  fetchAllUsersCompleted,
  fetchUserById,
  fetchUserByIdCompleted,
  fetchUserByUsername,
  fetchUserByUsernameCompleted,
  removeRoleFromUser,
  removeRoleFromUserCompleted,
  updateUserDetail
} from '../action/user.action';

@Injectable()
export class UserEffect {
  private actions$ = inject(Actions);

  constructor(
    private userService: UserService
  ) { }

  updateUserDetail$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(updateUserDetail),
      exhaustMap((action) => {
        return this.userService.updateUser(action.updatedUser as UserDto).pipe(
          map((user) => fetchUserByIdCompleted({ userDetail: { user: user as UserPublicDto, loading: false } })),
          catchError((error) => of(fetchUserByIdCompleted({ userDetail: { loading: false, error }})))
        )
      })
    )
  })

  fetchAllUsers$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(fetchAllUsers),
      exhaustMap((action) => {
        return this.userService.fetchAllUsers(action.page, action.size).pipe(
          map((data) => fetchAllUsersCompleted({ allUsers: { loading: false, data } })),
          catchError((error) => of(fetchAllUsersCompleted({ allUsers: { loading: false, error }})))
        )
      })
    )
  })

  fetchUserById$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(fetchUserById),
      exhaustMap((action) => {
        return this.userService.getUser(action.id).pipe(
          map((user) => fetchUserByIdCompleted({ userDetail: { user: user as UserPublicDto, loading: false } })),
          catchError((error) => of(fetchUserByIdCompleted({ userDetail: { loading: false, error }})))
        )
      })
    )
  })

  fetchUserByUsername$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(fetchUserByUsername),
      exhaustMap((action) => {
        return this.userService.getUserByUsername(action.username).pipe(
          map((user) => fetchUserByUsernameCompleted({ userDetail: { user: user as UserPublicDto, loading: false } })),
          catchError((error) => of(fetchUserByUsernameCompleted({ userDetail: { loading: false, error }})))
        )
      })
    )
  })

  fetchAllRoles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchAllRoles),
      exhaustMap(() => {
        return this.userService.fetchAllRoles().pipe(
          map((data) => {
            console.log({ data })
            return fetchAllRolesCompleted({ allRoles: { loading: false, data } })
          }),
          catchError((error) => of(fetchAllRolesCompleted({ allRoles: { loading: false, error } })))
        )
      })
    )
  })

  addRoleToUser$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(addRoleToUser),
      exhaustMap((action) => {
        return this.userService.addRoleToUser(action.userId, action.roleId).pipe(
          map((user) => addRoleToUserCompleted({ userDetail: { user: user as UserPublicDto, loading: false } })),
          catchError((error) => of(addRoleToUserCompleted({ userDetail: { loading: false, error }})))
        )
      })
    )
  })

  removeRoleFromUser$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(removeRoleFromUser),
      exhaustMap((action) => {
        return this.userService.removeRoleFromUser(action.userId, action.roleId).pipe(
          map((user) => removeRoleFromUserCompleted({ userDetail: { user: user as UserPublicDto, loading: false } })),
          catchError((error) => of(removeRoleFromUserCompleted({ userDetail: { loading: false, error }})))
        )
      })
    )
  })
}
