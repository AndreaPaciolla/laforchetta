import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class RestaurantDetailsService {
  constructor(private http: Http) { }
  // Uses http.get() to load a single JSON file
  getRestaurantDetails(id: string) {
    return this.http.get('/api/'+id+'.json')
      .map( (res:Response) => res.json() );
  }
}
