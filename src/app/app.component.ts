import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private zone: NgZone,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      const domain = 'exhibit.mzhubail.com';
      const path = event.url.split(domain)[1];

      // alert(`path = ${path}, cond = ${path.startsWith('/test-deeplinks')}`)
      if (path.startsWith('/test-deeplinks'))
        this.router.navigateByUrl(path)
      else
        this.router.navigateByUrl('/home')
    });
  }
}
