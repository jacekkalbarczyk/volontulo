import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomepageOfferComponent } from 'app/components/homepage-offer/homepage-offer.component';
import { OffersBoxComponent } from 'app/components/offers/offers-box/offers-box.component';
import { OffersService } from 'app/services/offers.service';

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
