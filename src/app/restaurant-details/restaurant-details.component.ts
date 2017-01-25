import { Component, OnInit } from '@angular/core';
import {RestaurantDetailsService} from "./restaurant-details.service";
import {ActivatedRoute} from "@angular/router";
import { TranslateService } from '../translate/translate.service'

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

    this.selectLang('es');
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

}
