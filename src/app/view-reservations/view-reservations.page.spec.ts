import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewReservationsPage } from './view-reservations.page';

describe('ViewReservationsPage', () => {
  let component: ViewReservationsPage;
  let fixture: ComponentFixture<ViewReservationsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewReservationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
