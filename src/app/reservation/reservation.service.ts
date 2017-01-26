import {Injectable} from '@angular/core';

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

}
