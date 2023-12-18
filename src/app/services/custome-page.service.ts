// @ts-nocheck
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomePageService {

  xx: any;
  yy: any;

  color: any;
  constructor() { 
    this.takeIndex(); 
  }

  takeIndex(x: any, y: any) {
    console.log(x + " " + y)
    this.xx = x;
    this.yy = y;
    this.color = "warning";
  }


 
}
