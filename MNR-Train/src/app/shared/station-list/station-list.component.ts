import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StationListService } from 'src/app/services/station-list.service';
import { TrainListService } from 'src/app/services/train-list.service';
import { Station } from 'src/app/models/station.model';

import { ModalController } from '@ionic/angular';

import * as moment from 'moment';
import { StationOccupancyComponent } from '../station-occupancy/station-occupancy.component';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss'],
})
export class StationListComponent implements OnInit {
  stations = [];
  title = ''
  constructor(private activatedRoute: ActivatedRoute,
    public modalController: ModalController,
    private stationService: StationListService,
    private trainListService: TrainListService,
    private router: Router) {
    this.stationService.stationList.forEach(s => {
      this.stations.push(s);
    })
  }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.paramMap.get("title");
  }

  async openStationsModal(station) {
    const modal = await this.modalController.create({
    component: StationOccupancyComponent,
    componentProps: {station: station }
    });
    return await modal.present();
   }

  previous() {
    this.router.navigateByUrl('/tabs/tab1');
  }

  stationChange(station: Station) {
    if (this.title == 'origin') {
      this.trainListService.originStation = station;
      this.trainListService.dtime = moment().toDate().toISOString( )
      console.log(this.trainListService.dtime)
      this.trainListService.reloadTrainsList.next();
      this.router.navigateByUrl('/tabs/tab1');
    } else if (this.title == 'destination') {
      this.trainListService.destinationStation = station;
      this.trainListService.dtime = moment().toDate().toISOString( )
      this.trainListService.reloadTrainsList.next();
      this.router.navigateByUrl('/tabs/tab1');
    } else {
      this.openStationsModal(station)
    }
  }

  setFilteredItems(event) {
  console.log(event)
  this.stations = this.filterItems(event);
  
  }

  filterItems(st) {
    return this.stationService.stationList.filter((item) => {
      return item.StationName.toLowerCase().includes(st.toLowerCase());
    });

  }
}
