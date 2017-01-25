import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class RestaurantsService {
  constructor(private http: Http) { }
  // Uses http.get() to load a single JSON file
  getRestaurants() {
    return this.http.get('/api/restaurants.json')
                    .map( (res:Response) => res.json() );
  }
}
