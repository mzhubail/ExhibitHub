import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HallInfoPage } from './hall-info.page';

describe('HallInfoPage', () => {
  let component: HallInfoPage;
  let fixture: ComponentFixture<HallInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HallInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
