import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { BranchDto } from '../../../../../api';
import { BranchService } from '../../service/branch.service';
import {
    addUserToBranch,
    addUserToBranchCompleted,
    fetchAllBranches,
    fetchAllBranchesCompleted,
    fetchAllBranchUsers,
    fetchAllBranchUsersCompleted,
    fetchBranchById,
    fetchBranchByIdCompleted,
    removeUserFromBranch,
    removeUserFromBranchCompleted,
    updateBranchDetail
} from '../action/branch.action';

@Injectable()
export class BranchEffect {
  private actions$ = inject(Actions);

  constructor(
    private branchService: BranchService
  ) { }

  updateBranchDetail$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(updateBranchDetail),
      exhaustMap((action) => {
        return this.branchService.updateBranch(action.updatedBranch as BranchDto).pipe(
          map((branch) => fetchBranchByIdCompleted({ branchDetail: { branch: branch, loading: false } })),
          catchError((error) => of(fetchBranchByIdCompleted({ branchDetail: { loading: false, error }})))
        )
      })
    )
  })

  fetchAllBranches$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(fetchAllBranches),
      exhaustMap(() => {
        return this.branchService.fetchAllBranches().pipe(
          map((data) => fetchAllBranchesCompleted({ allBranches: { loading: false, data } })),
          catchError((error) => of(fetchAllBranchesCompleted({ allBranches: { loading: false, error }})))
        )
      })
    )
  })

  fetchBranchById$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(fetchBranchById),
      exhaustMap((action) => {
        return this.branchService.getBranch(action.id).pipe(
          map((branch) => fetchBranchByIdCompleted({ branchDetail: { branch: branch, loading: false } })),
          catchError((error) => of(fetchBranchByIdCompleted({ branchDetail: { loading: false, error }})))
        )
      })
    )
  })

  fetchAllBranchUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchAllBranchUsers),
      exhaustMap((action) => {
        return this.branchService.fetchAllBranchUsers(action.branchId).pipe(
          map((data) => {
            return fetchAllBranchUsersCompleted({ allBranchUsers: { loading: false, data } })
          }),
          catchError((error) => of(fetchAllBranchUsersCompleted({ allBranchUsers: { loading: false, error } })))
        )
      })
    )
  })

  addUserToBranch$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(addUserToBranch),
      exhaustMap((action) => {
        return this.branchService.addUserToBranch(action.userId, action.branchId).pipe(
          map((branch) => addUserToBranchCompleted({ branchDetail: { branch, loading: false } })),
          catchError((error) => of(addUserToBranchCompleted({ branchDetail: { loading: false, error }})))
        )
      })
    )
  })

  removeUserFromBranch$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(removeUserFromBranch),
      exhaustMap((action) => {
        return this.branchService.removeUserFromBranch(action.userId, action.branchId).pipe(
          map((branch) => removeUserFromBranchCompleted({ branchDetail: { branch, loading: false } })),
          catchError((error) => of(removeUserFromBranchCompleted({ branchDetail: { loading: false, error }})))
        )
      })
    )
  })
}
