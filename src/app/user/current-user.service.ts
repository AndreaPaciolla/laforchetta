import {Injectable} from '@angular/core';
import {IUser} from "./user.interface";

@Injectable()
export class CurrentUserService {

  private users: Array<IUser>;
  private loggedUserEmail: string;

  constructor() {}

  readFromLocalStorage() {
    this.loggedUserEmail = localStorage.getItem('logged_user_email');
    this.users = JSON.parse(localStorage.getItem('users'));
  }

  getCurrentUser(): IUser {
    this.readFromLocalStorage();
    if(this.loggedUserEmail) {
      return this.users.filter( user => user.email === this.loggedUserEmail )[0];
    }
    return undefined;
  }

  getLoggedUserEmail(): string {
    this.readFromLocalStorage();
    return this.loggedUserEmail;
  }

  isLogged() {
    this.readFromLocalStorage();
    return (this.users.filter( user => user.email === this.loggedUserEmail ).length) ? true : false;
  }

}
