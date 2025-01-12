import { Injectable } from '@angular/core';
import {AuthControllerService, RoleDto, UserDto, UserPublicDto} from '../../../../api';
import StatusEnum = UserPublicDto.StatusEnum;
import {Observable} from 'rxjs';
import NameEnum = RoleDto.NameEnum;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authControllerService: AuthControllerService) { }

  castToAccount(formValue: any, create: boolean = true): UserDto {
    const castedUser: UserDto = {
      username: formValue.username,
      password: formValue.password,
    };

    if (create) {
      castedUser.email = formValue.email;
      castedUser.username = formValue.username;
      castedUser.firstName = formValue.firstName;
      castedUser.lastName = formValue.lastName;
      castedUser.email = formValue.email;
      castedUser.status = StatusEnum.Active;
      castedUser.roles = [ { name: NameEnum.User } ];
    }
    console.log({castedUser});
    return castedUser;
  }

  createAccount(formValue: any): Observable<object> {
    const newUser: UserDto = this.castToAccount(formValue);
    return this.authControllerService.registerUser(newUser)
  }

  accessAccount(formValue: any): Observable<object> {
    const user: UserDto = this.castToAccount(formValue, false);
    return this.authControllerService.authenticateUser(user)
  }
}
