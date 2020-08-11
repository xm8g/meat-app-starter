import { FormBuilder, FormGroup, FormControlName, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { switchMap, tap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators'
import { Observable, from } from 'rxjs';


@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: '0',
        'max-height': '0px'
      })),
      state('visible', style({
        opacity: '1',
        'max-height': '70px',
        'margin-top': '20px'
      })),
      transition('* => *', animate('500ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[];

  searchBarState = 'hidden'

  searchForm: FormGroup
  searchControl: FormControl

  constructor(
    private restaurantService: RestaurantsService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.restaurantService.restaurants().subscribe(
      responseRestaurants => this.restaurants = responseRestaurants
    )

    this.searchControl = this.formBuilder.control('')

    this.searchForm = this.formBuilder.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500), //evita consultas a cada letra digitada. Se passar de 500ms aí começa a consultar
        distinctUntilChanged(), //evita a consulta se o termo de busca for igual ao anterior
        switchMap(
          searchTerm => this.restaurantService.restaurants(searchTerm)
            .pipe(catchError(error => from([])))
        )
      )
      .subscribe(responseRestaurants => this.restaurants = responseRestaurants)
  }

  toggleBarSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

}
