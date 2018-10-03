import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../homepage-offer/offers.service';
import { Offer } from '../../homepage-offer/offers.model'

@Component({
  selector: 'volontulo-offers-box',
  templateUrl: './offers-box.component.html',
  styleUrls: ['./offers-box.component.scss'],
  providers: [OffersService]
})
export class OffersBoxComponent implements OnInit {
  offers: Offer[] = [];

  constructor(private offersService: OffersService) {
  }

  ngOnInit() {
    this.offersService.getUserOffers()
      .subscribe(offers => this.offers = offers);
  }
}
