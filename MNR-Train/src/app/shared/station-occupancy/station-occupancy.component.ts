import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-station-occupancy',
  templateUrl: './station-occupancy.component.html',
  styleUrls: ['./station-occupancy.component.scss'],
})
export class StationOccupancyComponent implements OnInit {
  station;
  constructor(public viewCtrl: ModalController,
    navParams: NavParams) {
      this.station = navParams.get('station')
      console.log(this.station)
    }

  ngOnInit() {}

  dismissModal() {
    this.viewCtrl.dismiss();
    }

}
