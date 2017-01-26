import { Component, OnInit } from '@angular/core';
import {RestaurantDetailsService} from "./restaurant-details.service";
import {ActivatedRoute} from "@angular/router";
import { TranslateService } from '../translate/translate.service';
import { CurrentUserService } from '../user/current-user.service';
import * as Moment from 'moment'
import {ReservationService} from "../reservation/reservation.service";

interface IDatePicker {
  day: string;
  month: string;
  year: string;
  formatted: string;
  momentObj: string;
}

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css'],
  providers: [
    RestaurantDetailsService,
    CurrentUserService,
    ReservationService
  ]
})
export class RestaurantDetailsComponent implements OnInit {

  public restaurant: Object;
  public supportedLangs: any;
  public translatedText: string;
  public reservations: any;
  public isLogged: boolean;
  public restaurantReservations: Array<Object>;

  constructor(private restaurantsService: RestaurantDetailsService,
              public currentUserService: CurrentUserService,
              public reservationService: ReservationService,
              private route: ActivatedRoute,
              private _translate: TranslateService) {
    this.isLogged = currentUserService.isLogged();
    this.restaurantReservations = [];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurant = this.restaurantsService.getRestaurantDetails( params.id )
        .subscribe(data => this.restaurant = data,
          err => console.log(err),
          () => console.log('Completed'));
    });

    window.setTimeout( ()=> {
      this.restaurantReservations = this.reservationService.getReservationForRestaurant(this.restaurant.slug);
    }, 1000);

    this.supportedLangs = [
      { display: 'English', value: 'en' },
      { display: 'Italiano', value: 'it' }
    ];

    this.selectLang('en');
  }

  isCurrentLang(lang: string) {
    // check if the selected lang is current lang
    return lang === this._translate.currentLang;
  }

  selectLang(lang: string) {
    // set current lang;
    this._translate.use(lang);
    this.refreshText();
  }

  refreshText() {
    // refresh translation when language change
    this.translatedText = this._translate.instant('hello world');
  }

  addReservation(date: IDatePicker, timeframe: any, pax: number) {
    if (date == undefined || Moment(date.formatted).isBefore(new Date())) {
      alert("Select valid date");
      return;
    }
    this.reservations = this.reservationService.getReservationForRestaurant();
    // if there are restaurant reservations then check if there is
    let reservationForThisRestaurant = this.reservationService.getReservationForRestaurant(this.restaurant.slug);
    // check if in the date you're booking for .. pax are available
    if (reservationForThisRestaurant.length) {
      // check if i have already booked some seats in this date, for this restaurant
      if (reservationForThisRestaurant.filter(reservation => reservation.user == this.currentUserService.getCurrentUser().email && reservation.date == date.formatted).length) {
        alert("You have already booked a table on this date at this restaurant");
        return;
      }

      let totalPaxBookedForThisDate = reservationForThisRestaurant
        .filter(reservation => reservation.date == date.formatted && reservation.timeframe == timeframe)
        .reduce((totalBookedPax, currentReservation) => {
          return totalBookedPax += currentReservation.pax
        }, 0);

      if (totalPaxBookedForThisDate == this.restaurant.posti || pax + totalPaxBookedForThisDate > this.restaurant.posti) {
        alert(this.restaurant.nome + " is full on this date and timeframe for this people. Only " + parseInt(this.restaurant.posti - totalPaxBookedForThisDate) + " are available.");
        return;
      }

      // no errors, confirm!
      this.confirmReservation(date, timeframe, pax);
    } else {
      // no errors, confirm!
      this.confirmReservation(date, timeframe, pax);
    }
  }

  private confirmReservation(date: IDatePicker, timeframe: any, pax: number) {
    this.reservations.push({
      user: localStorage.getItem('logged_user_email'),
      timeframe: timeframe,
      date: date.formatted,
      pax: pax,
      restaurant: this.restaurant.slug
    });

    localStorage.setItem('reservations', JSON.stringify(this.reservations));

    alert("Reservation done! " + this.restaurant.nome + " on " + date.formatted + " at " + timeframe);
  }


}
