import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TrainListService } from '../services/train-list.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private router: Router,
    public trainListService: TrainListService) {
  }

  ngOnInit() {
    console.log('Tab1 OnInit called')
  }

  pickStation(from) {
    this.router.navigateByUrl('tabs/stationInfo/' + from);
  }

  dateChanged(event) {
    console.log(event)
    this.trainListService.dtime = event.detail.value
    this.trainListService.reloadTrainsList.next();
  }

}
