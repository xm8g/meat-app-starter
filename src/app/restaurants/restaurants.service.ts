import { Restaurant } from './restaurant/restaurant.model';
import { MEAT_API } from '../app.api';
import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Review } from '../restaurant-detail/reviews/review.model';
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model';

@Injectable()
export class RestaurantsService {
  constructor(private http: HttpClient) { }

  restaurants(search?: string): Observable<Restaurant[]> {
    let params: HttpParams = undefined
    if (search) {
      params = new HttpParams().set('q', search)
    }
    return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params})
  }

  restaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
  }
  /**
   * Passa-se a referência da função, 
   * que é executada pelo operador catch dinamicamente. 
   * O objeto Response é disparado pela API Http do Angular, 
   * que cai no catch e este passa para a função.
   */

  reviewsOfRestaurant(id: string): Observable<Review> {
    return this.http.get<Review>(`${MEAT_API}/restaurants/${id}/reviews`)
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
  }
}
