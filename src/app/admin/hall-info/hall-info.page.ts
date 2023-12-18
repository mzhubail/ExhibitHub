//@ts-nocheck
import { Component, OnInit, ViewChild,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HallService, Hall } from 'src/app/services/hall.service';

import { FormControlName, FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';

@Component({
  selector: 'app-hall-info',
  templateUrl: './hall-info.page.html',
  styleUrls: ['./hall-info.page.scss'],
})
export class HallInfoPage implements OnInit {
  hallInfo: Hall = {};

  HallForm: FormGroup;
  
  constructor(
    public service: HallService,
    public ActRouter: ActivatedRoute,
    public formbuilder: FormBuilder,
  ) {
    this.HallForm! = formbuilder.group({
      username: ['',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z]*'),
          Validators.minLength(8),
          Validators.maxLength(30)])],

      password: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(8)])]
});
}




  ngOnInit() {
    let id = this.ActRouter.snapshot.paramMap.get('id');
    this.showData(id);
  }

  showData(id: string) {
    this.service
      .getHall(id)
      .then((hallInfo) => {
        this.hallInfo = hallInfo;
        console.log(this.hallInfo);
      })
      .catch((error) => {
        console.error('Error retrieving hall data:', error);
      });
  }


  UpdateHallInfo(val){
   if ( this.HallForm.valid )
	alert('edited succefully ' + val.username);
 }
}