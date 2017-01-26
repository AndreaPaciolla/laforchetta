import {Injectable} from '@angular/core';
import {IUser} from "../user/user.interface";

@Injectable()
export class ReservationService {

  constructor() {}

  getReservationForRestaurant(restaurantSlug: string | undefined): any {
    let reservations = localStorage.getItem('reservations');
    if(reservations == null) {
      return [];
    }

    if(restaurantSlug) {
      reservations = JSON.parse(reservations).filter( reservation => reservation.restaurant == restaurantSlug);
    } else {
      reservations = JSON.parse(reservations);
    }
    return reservations;
  }

  getReservationForUser(user: IUser): any {
    let reservations = localStorage.getItem('reservations');
    if(reservations == null) {
      return [];
    }

    if(user) {
      reservations = JSON.parse(reservations).filter( reservation => reservation.user == user.email);
    } else {
      reservations = JSON.parse(reservations);
    }
    return reservations;
  }

}
