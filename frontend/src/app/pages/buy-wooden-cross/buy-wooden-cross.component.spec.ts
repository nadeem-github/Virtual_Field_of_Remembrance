import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyWoodenCrossComponent } from './buy-wooden-cross.component';

describe('BuyWoodenCrossComponent', () => {
  let component: BuyWoodenCrossComponent;
  let fixture: ComponentFixture<BuyWoodenCrossComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyWoodenCrossComponent]
    });
    fixture = TestBed.createComponent(BuyWoodenCrossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
