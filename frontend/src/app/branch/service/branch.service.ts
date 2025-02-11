import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BranchControllerService, BranchDto, UserPublicDto } from '../../../../api';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(
    private branchControllerService: BranchControllerService
  ) { }
  
    getBranch(id: string): Observable<BranchDto>{
      return this.branchControllerService.fetchBranchById(id);
    }
  
    createBranch(createdBranch: BranchDto): Observable<BranchDto>{
      console.log({ createdBranch })
      return this.branchControllerService.createBranch(createdBranch);
    }
  
    removeBranch(removedBranch: BranchDto): Observable<BranchDto>{
      return this.branchControllerService.deleteBranch(removedBranch);
    }
  
    updateBranch(updatedBranch: BranchDto): Observable<BranchDto>{
      return this.branchControllerService.updateBranch(updatedBranch);
    }
  
    fetchAllBranches(): Observable<Array<BranchDto>>{
      return this.branchControllerService.fetchAllBranches();
    }
  
    fetchAllBranchUsers(branchId: string): Observable<Set<UserPublicDto>>{
      return this.branchControllerService.fetchAllUsersByBranchId(branchId);
    }
  
    addUserToBranch(userId: string, branchId: string): Observable<BranchDto> {
      return this.branchControllerService.addUserToBranch(userId, branchId)
    }
  
    removeUserFromBranch(userId: string, branchId: string): Observable<BranchDto> {
      return this.branchControllerService.removeUserFromBranch(userId, branchId);
    }
}
