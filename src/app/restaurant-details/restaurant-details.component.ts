import { Component, OnInit } from '@angular/core';
import {RestaurantDetailsService} from "./restaurant-details.service";
import {ActivatedRoute} from "@angular/router";
import { TranslateService } from '../translate/translate.service'

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
  providers: [RestaurantDetailsService]
})
export class RestaurantDetailsComponent implements OnInit {

  public restaurant: Object;
  public supportedLangs: any;
  public translatedText: string;
  public reservations: any;

  constructor(private restaurantsService: RestaurantDetailsService, private route: ActivatedRoute, private _translate: TranslateService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurant = this.restaurantsService.getRestaurantDetails( params.id )
        .subscribe(data => this.restaurant = data,
          err => console.log(err),
          () => console.log('Completed'));
    });

    this.supportedLangs = [
      { display: 'English', value: 'en' },
      { display: 'Italiano', value: 'it' }
    ];

    this.selectLang('it');
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

  addReservation(date: IDatePicker, timeframe: any) {
    // take all the reservation done
    this.reservations = JSON.parse(localStorage.getItem('reservations'));

    // Check if there are no reservation yet
    if(this.reservations == null) {
      // If so, initialize a new empty array
      this.reservations = [];
    }else{
      // otherwise check if there is another equal reservation
      let reservationsSameRestaurantSameTimeframe = this.reservations.filter( reservation => {
        return reservation.restaurant == this.restaurant.slug && reservation.timeframe == timeframe;
      });
      if(reservationsSameRestaurantSameTimeframe.length > 0) {
        // If so, then no reservation can be done. Restaurant is full.
        alert(this.restaurant.nome + " is full at " + timeframe);
        return;
      }
    }

    this.reservations.push({
      user: JSON.parse(localStorage.getItem('logged_user_email')),
      timeframe: timeframe,
      restaurant: this.restaurant.slug
    });

    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

}
