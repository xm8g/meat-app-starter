import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OrderComponent } from './order.component';
import { Observable } from 'rxjs';

export class LeaveOrderGuard implements CanDeactivate<OrderComponent> {
  canDeactivate(
    component: OrderComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    if (!component.isOrderCompleted()) {
      return window.confirm('Deseja desistir da compra?')
    }
    return true
  }

}
