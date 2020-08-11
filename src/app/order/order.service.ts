import { MEAT_API } from './../app.api';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart-service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order } from './order.model';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrderService {

  constructor(
    private cartService: ShoppingCartService,
    private http: HttpClient) { }

  cartItems(): CartItem[] {
    return this.cartService.items;
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item)
  }

  orderValue(): number {
    return this.cartService.total()
  }

  checkOrder(order: Order): Observable<Order> {

    return this.http.post<Order>(`${MEAT_API}/orders`, order)
  }

  clear() {
    this.cartService.clear()
  }
}