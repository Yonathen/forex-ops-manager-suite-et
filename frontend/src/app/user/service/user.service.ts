import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponseDTOUserPublicDto, RoleControllerService, RoleDto, UserControllerService, UserDto, UserPublicDto } from '../../../../api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private userControllerService: UserControllerService,
    private roleControllerService: RoleControllerService
  ) { }

  getUser(id: string): Observable<UserPublicDto>{
    console.log({ id })
    return this.userControllerService.fetchUserById(id);
  }

  updateUser(updatedUser: UserDto): Observable<UserPublicDto>{
    return this.userControllerService.updateUser(updatedUser);
  }

  fetchAllUsers(page: number, size: number): Observable<PaginatedResponseDTOUserPublicDto>{
    return this.userControllerService.fetchAllUsers(page, size);
  }

  fetchAllRoles(): Observable<Array<RoleDto>> {
    return this.roleControllerService.fetchAllRolees();
  }

  addRoleToUser(userId: string, roleId: string): Observable<UserPublicDto> {
    return this.userControllerService.addRoleToUser(userId, roleId)
  }

  removeRoleFromUser(userId: string, roleId: string): Observable<UserPublicDto> {
    return this.userControllerService.removeRoleFromUser(userId, roleId);
  }

}
