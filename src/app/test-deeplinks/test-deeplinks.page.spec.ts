import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestDeeplinksPage } from './test-deeplinks.page';

describe('TestDeeplinksPage', () => {
  let component: TestDeeplinksPage;
  let fixture: ComponentFixture<TestDeeplinksPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestDeeplinksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
