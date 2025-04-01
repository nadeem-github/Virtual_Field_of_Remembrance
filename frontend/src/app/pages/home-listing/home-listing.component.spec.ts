import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeListingComponent } from './home-listing.component';

describe('HomeListingComponent', () => {
  let component: HomeListingComponent;
  let fixture: ComponentFixture<HomeListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeListingComponent]
    });
    fixture = TestBed.createComponent(HomeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
