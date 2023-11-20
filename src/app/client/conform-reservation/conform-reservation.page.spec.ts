import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConformReservationPage } from './conform-reservation.page';

describe('ConformReservationPage', () => {
  let component: ConformReservationPage;
  let fixture: ComponentFixture<ConformReservationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConformReservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
