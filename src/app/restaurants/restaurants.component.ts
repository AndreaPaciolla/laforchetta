import { Component, OnInit } from '@angular/core';
import {RestaurantsService} from "./restaurants.service";
import {RestaurantNameFilter} from "./restaurants.pipe";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
  providers: [RestaurantsService],
  pipes: [RestaurantNameFilter],
})
export class RestaurantsComponent implements OnInit {

  public restaurants: Array<Object>;
  constructor(private restaurantsService: RestaurantsService) { }

  ngOnInit() {
    this.restaurants = Array<Object>this.restaurantsService.getRestaurants()
        .subscribe(data => this.restaurants = data,
          err => console.log(err),
          () => console.log('Completed'));
  }

}
