import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowEventDraftPage } from './show-event-draft.page';

describe('ShowEventDraftPage', () => {
  let component: ShowEventDraftPage;
  let fixture: ComponentFixture<ShowEventDraftPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowEventDraftPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
