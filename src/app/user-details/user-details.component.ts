import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IUser} from "../user/user.interface";
import {ReservationService} from "../reservation/reservation.service";
import {CurrentUserService} from "../user/current-user.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [ReservationService, CurrentUserService]
})
export class UserDetailsComponent implements OnInit {

  public user: IUser;
  public userReservations: any;
  public userLoggedEmail: string;

  constructor(private _reservationService: ReservationService, private _currentUserService: CurrentUserService, private _route: ActivatedRoute) {}

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.user = JSON.parse(localStorage.getItem('users') ).filter( usr => usr.id == params.id)[0];
      this.userReservations = this._reservationService.getReservationForUser(this.user);
      this.userLoggedEmail = this._currentUserService.getLoggedUserEmail();
    });
  }

}
