import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserControllerService, UserDto, UserPublicDto } from '../../../../api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private userControllerService: UserControllerService
  ) { }

  getUser(id: string): Observable<UserPublicDto>{
    console.log({ id })
    return this.userControllerService.fetchUserById(id);
  }

  updateUser(updatedUser: UserDto): Observable<UserPublicDto>{
    return this.userControllerService.updateUser(updatedUser);
  }
}
