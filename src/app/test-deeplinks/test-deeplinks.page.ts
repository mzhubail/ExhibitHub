import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-deeplinks',
  templateUrl: './test-deeplinks.page.html',
  styleUrls: ['./test-deeplinks.page.scss'],
})
export class TestDeeplinksPage implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
  }

}
