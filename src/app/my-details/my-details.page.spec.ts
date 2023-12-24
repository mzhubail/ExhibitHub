import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyDetailsPage } from './my-details.page';

describe('MyDetailsPage', () => {
  let component: MyDetailsPage;
  let fixture: ComponentFixture<MyDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
