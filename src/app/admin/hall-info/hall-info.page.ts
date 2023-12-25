import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HallService, Hall } from 'src/app/services/hall.service';

import { FormControlName, FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-hall-info',
  templateUrl: './hall-info.page.html',
  styleUrls: ['./hall-info.page.scss'],
})
export class HallInfoPage implements OnInit {
  hallInfo!: Hall;

  HallForm: FormGroup;
  
  constructor(
    public service: HallService,
    public ActRouter: ActivatedRoute,
    public formbuilder: FormBuilder,
    public navController: NavController,
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
    if (id === null) {
      this.navController.navigateRoot('/');
      return;
    }

    const hall = this.service.findHallById(id);
    if (!hall) {
      this.navController.navigateRoot('/');
      return;
    }

    this.hallInfo = hall;
    console.log(this.hallInfo);
  }


}
