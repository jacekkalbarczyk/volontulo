import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../homepage-offer/offers.service';
import { Offer } from '../../homepage-offer/offers.model'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'volontulo-offers-box',
  templateUrl: './offers-box.component.html',
  providers: [OffersService]
})
export class OffersBoxComponent implements OnInit {
  public offers$: Observable<Offer[]>;

  constructor(private offersService: OffersService) { }

  ngOnInit() {
    this.offers$ = this.offersService.getUserOffers();
  }
}
