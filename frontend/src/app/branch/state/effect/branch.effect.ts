import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { BranchDto } from '../../../../../api';
import { BranchService } from '../../service/branch.service';
import {
  addUserToBranch,
  addUserToBranchCompleted,
  createBranchDetail,
  createBranchDetailCompleted,
  fetchAllBranches,
  fetchAllBranchesCompleted,
  fetchAllBranchUsers,
  fetchAllBranchUsersCompleted,
  fetchBranchById,
  fetchBranchByIdCompleted,
  removeBranchDetail,
  removeBranchDetailCompleted,
  removeUserFromBranch,
  removeUserFromBranchCompleted,
  updateBranchDetail,
  updateBranchDetailCompleted
} from '../action/branch.action';

@Injectable()
export class BranchEffect {
  private actions$ = inject(Actions);

  constructor(
    private branchService: BranchService
  ) { }

  createBranchDetail$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(createBranchDetail),
      exhaustMap((action) => {
        console.log({ action })
        return this.branchService.createBranch(action.createdBranch as BranchDto).pipe(
          map((branch) => createBranchDetailCompleted({ branchDetail: { branch: branch, loading: false } })),
          catchError((error) => of(createBranchDetailCompleted({ branchDetail: { loading: false, error }})))
        )
      })
    )
  })

  removeBranchDetail$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(removeBranchDetail),
      exhaustMap((action) => {
        return this.branchService.removeBranch(action.removedBranch as BranchDto).pipe(
          map((branch) => removeBranchDetailCompleted({ branchDetail: { branch: branch, loading: false } })),
          catchError((error) => of(removeBranchDetailCompleted({ branchDetail: { loading: false, error }})))
        )
      })
    )
  })

  updateBranchDetail$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(updateBranchDetail),
      exhaustMap((action) => {
        return this.branchService.updateBranch(action.updatedBranch as BranchDto).pipe(
          map((branch) => updateBranchDetailCompleted({ branchDetail: { branch: branch, loading: false } })),
          catchError((error) => of(updateBranchDetailCompleted({ branchDetail: { loading: false, error }})))
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
