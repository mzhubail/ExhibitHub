import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationsDatesPage } from './reservations-dates.page';

describe('ReservationsDatesPage', () => {
  let component: ReservationsDatesPage;
  let fixture: ComponentFixture<ReservationsDatesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReservationsDatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
