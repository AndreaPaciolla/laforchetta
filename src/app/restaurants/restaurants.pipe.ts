import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'restaurantNameFilter',
  pure: false
})
@Injectable()
export class RestaurantNameFilter implements PipeTransform {
  transform(items: any[], args: any[]): any {
    if(items) {
      if(items.length && args != undefined && args != "") {
        return items.filter(item => item.nome.toLowerCase().indexOf(args[0].toLowerCase()) !== -1);
      }
    }
    return items;
  }
}
