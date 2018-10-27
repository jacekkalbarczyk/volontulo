import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomepageOfferComponent } from '../../homepage-offer/homepage-offer.component';
import { OffersBoxComponent } from './offers-box.component';
import { OffersService } from '../../homepage-offer/offers.service';

describe('OffersBoxComponent', () => {
  let component: OffersBoxComponent;
  let fixture: ComponentFixture<OffersBoxComponent>;
  let offersService: OffersService;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [
        OffersBoxComponent,
        HomepageOfferComponent
      ],
      providers: [OffersService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersBoxComponent);
    component = fixture.componentInstance;
    offersService = TestBed.get(OffersService);
    httpClient = TestBed.get(HttpClient);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
