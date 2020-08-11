import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../restaurants/restaurants.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { _PATH_REACTION, Review } from './review.model';


@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<Review>

  constructor(
    private restaurantsService: RestaurantsService,
    private route: ActivatedRoute) { }


  ngOnInit() {
    this.reviews = this.restaurantsService.reviewsOfRestaurant(this.route.parent.snapshot.params['id'])
  }

  iconSelect(rating: number): string {
    if (rating >= 4) {
      return `${_PATH_REACTION}/loved.png`
    } else if (rating >= 3) {
      return `${_PATH_REACTION}/soso.png`
    } else {
      return `${_PATH_REACTION}/pissed.png`
    }
  }

}
