import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersBoxComponent } from './offers-box.component';

describe('OffersBoxComponent', () => {
  let component: OffersBoxComponent;
  let fixture: ComponentFixture<OffersBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
