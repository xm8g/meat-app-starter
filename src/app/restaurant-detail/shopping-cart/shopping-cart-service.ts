import { CartItem } from './cart-item.model';
import { MenuItem } from '../menu-item/menu-item.model';
import { Injectable } from '@angular/core';
import { NotificationService } from '../../shared/messages/notification.services';

@Injectable() //para injetar o NotificationService
export class ShoppingCartService {
  
  constructor(private notificationService: NotificationService) {

  }

  items: CartItem[] = []

  clear() {
    this.items = []
  }

  addItem(menuItem: MenuItem) {
    let foundMenuItem = this.items.find((item) => item.menuItem.id === menuItem.id)
    if (foundMenuItem) {
      this.increaseQty(foundMenuItem)
    } else {
      this.items.push(new CartItem(menuItem))
    }
    this.notificationService.notify(`Item adicionado: ${menuItem.name}`)
  }

  removeItem(item: any) {
    this.items.splice(this.items.indexOf(item), 1)
    this.notificationService.notify(`Item Removido: ${item.name}`)
  }

  total(): number {
    return this.items
      .map(cartItem => cartItem.value())
      .reduce((prev, value) => prev + value, 0)
  }

  increaseQty(item: CartItem) {
    item.quantity += 1
  }

  decreaseQty(item: CartItem) {
    item.quantity -= 1
    if(item.quantity === 0) {
      this.removeItem(item)
    }
  }
}