import {Inject, Injectable} from '@angular/core';
import {AuthControllerService, RoleDto, UserDto, UserPublicDto} from '../../../../api';
import StatusEnum = UserPublicDto.StatusEnum;
import {BehaviorSubject, Observable} from 'rxjs';
import NameEnum = RoleDto.NameEnum;
import {Router} from '@angular/router';
import {APP_DATA_STORAGE} from '../../shared/provider/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(APP_DATA_STORAGE) private storage: Storage,
    private authControllerService: AuthControllerService,
    private router: Router
  ) { }

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
    return castedUser;
  }

  saveToken(token: string) {
    this.storage.setItem('token', token);
    this.loggedIn.next(true);
  }

  logout() {
    this.router.navigate(['/sign-in']).then(r => {
      if (!r) return;

      this.loggedIn.next(false)
      this.storage.removeItem('token');
    });
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  getToken() {
    return this.storage.getItem('token');
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
