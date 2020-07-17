import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainDescriptionService } from 'src/app/services/train-description.service';
import { StationListService } from 'src/app/services/station-list.service';
import { TrainListService } from 'src/app/services/train-list.service';

import * as moment from 'moment';
import { TrainOccupancyComponent } from '../train-occupancy/train-occupancy.component';
import { ModalController } from '@ionic/angular';
import { StationOccupancyComponent } from '../station-occupancy/station-occupancy.component';

@Component({
  selector: 'app-train-description',
  templateUrl: './train-description.component.html',
  styleUrls: ['./train-description.component.scss'],
})
export class TrainDescriptionComponent implements OnInit {
  train
  constructor(private router: Router,
    public modalController: ModalController,
    public trainDescriptionService: TrainDescriptionService,
    private trainListService: TrainListService,
    public stationListService: StationListService) {
    if (!this.trainDescriptionService.chosenTrip) {
      this.router.navigateByUrl('/tabs/tab1');
    }

  }

  previous() {
    this.router.navigateByUrl('/tabs/tab1');
  }

  ngOnInit() {
    this.loadLiveTrainData()
    this.trainDescriptionService.trainRefreshed.subscribe(() => {
      this.loadLiveTrainData()
    });
  }

  loadLiveTrainData() {
    let selDate = moment(this.trainListService.dtime)

    if (!this.datesAreOnSameDay(selDate, moment())) {
      console.log('Not on the same day')
      return;
    }
    
    this.trainDescriptionService.cards.forEach(f => {
      this.trainDescriptionService.fetchLiveTrainInfo(f.common.TrainName).subscribe((res: any) => {
        console.log(res);
        f.common.TrainStatus = res.status && res.status.display ? res.status.display : f.common.TrainStatus;
        f.common.stopLeft = []

        if (res.stops && res.stops.length > 0) {
          res.stops.forEach(element => {
            f.common.stopLeft.push(parseInt(element))
          });

        }

        f.common['cars'] = []

        if (res.consist && res.consist.Cars && res.consist.Cars.length > 0) {
          res.consist.Cars.forEach(element => {
            f.common['cars'].push(element)
          });
        }

        f.common['ScheduleTime'] = []
        f.common['ActualTime'] = []
        f.common['EstimatedScheduleTime'] = []
        f.common['StatusDesc'] = []

        if (res.trainStops && res.trainStops.length > 0) {
          let k = 0;
          res.trainStops.forEach(element => {
            if (k != 0) { 
              // Actual Time
            let sdd = this.formatTimeFromFullTime(element['ScheduleTime']);
            f.common['ScheduleTime'].push(sdd)

            // Train has already left
            if (element['StatusDesc'] == 'Departed') {

              if (element['ScheduleTime'] && element['ActualTime']) {
                let scd = moment(element['ScheduleTime'])
                let ad = moment(element['ActualTime'])
                let msDifference = (scd.valueOf() - ad.valueOf())
                let diff = Math.round(msDifference / 60000);

                if (diff < 0) {
                  f.common['ActualTime'].push(Math.abs(diff) + 'm late')
                } else {
                  f.common['ActualTime'].push('')
                }
              } else {
                f.common['ActualTime'].push('')
              }
              f.common['EstimatedScheduleTime'].push('')
            } else {
              f.common['ActualTime'].push('')
              if (element['EstimatedScheduleTime']) {
                let sdd = this.formatTimeFromFullTime(element['EstimatedScheduleTime']);
                f.common['EstimatedScheduleTime'].push(sdd)
              } else {
                f.common['EstimatedScheduleTime'].push('')
              }
            }
          }
          k++
          })
        }

      }, error => {

      });
    });
  }

  async openTrainModal() {
    const modal = await this.modalController.create({
    component: TrainOccupancyComponent
    });
    return await modal.present();
   }

  //  async openStationModal(station) {
  //   const modal = await this.modalController.create({
  //   component: StationOccupancyComponent,
  //   componentProps: {station: station }
  //   });
  //   return await modal.present();
  //  }
  
  datesAreOnSameDay(first, second) {
    return first.year() === second.year() &&
    first.month() === second.month() &&
    first.day() === second.day();
  }

  formatTimeFromFullTime(d) {
    if (d) {
      let sd = moment(d)
      let sdd = sd.hour() + ':' + (sd.minutes() < 10 ? ('0' + sd.minutes()) : sd.minutes()) + ((sd.hours() < 12) ? " AM" : " PM");
      return sdd
    }

    return ''

  }

}
