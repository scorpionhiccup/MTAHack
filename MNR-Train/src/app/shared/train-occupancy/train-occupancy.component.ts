import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-train-occupancy',
  templateUrl: './train-occupancy.component.html',
  styleUrls: ['./train-occupancy.component.scss'],
})
export class TrainOccupancyComponent implements OnInit {

  train;
  constructor(public viewCtrl: ModalController,
    navParams: NavParams) {
      this.train = navParams.get('station')
      console.log(this.train)
    }

  ngOnInit() {}

  dismissModal() {
    this.viewCtrl.dismiss();
    }
}
