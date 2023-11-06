import { Injectable } from '@angular/core';

@Injectable()
export class WasSubmittedService {
  public wasSubmitted : boolean = false;
  constructor() {}
}
