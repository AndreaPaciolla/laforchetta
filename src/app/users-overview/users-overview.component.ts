import { Component, OnInit } from '@angular/core';
import {IUser} from "../user/user.interface";

@Component({
  selector: 'app-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.css']
})
export class UsersOverviewComponent implements OnInit {

  public users: Array<IUser>;

  constructor() { }

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem('users'));
  }

}
