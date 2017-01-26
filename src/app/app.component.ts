import { Component } from '@angular/core';
import {IUser} from "./user/user.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'La forchetta App!';

  constructor() {

    let users: Array<IUser> = [{
      'email':'andreapaciolla@gmail.com',
      'password': 'k1',
      'name': 'andrea',
      'surname': 'paciolla',
      'age': 23,
      'city': 'milano'
    },
    {
      'email':'paolorossi@gmail.com',
      'password': 'k2',
      'name': 'paolo',
      'surname': 'rossi',
      'age': 30,
      'city': 'roma'
    }];

    if (typeof(Storage) !== "undefined") {
      // store the users
      localStorage.setItem("users", JSON.stringify(users));
    }
  }

}
