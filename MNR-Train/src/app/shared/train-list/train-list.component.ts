import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainDescriptionService } from 'src/app/services/train-description.service';
import { TrainListService } from 'src/app/services/train-list.service';
import { Subscription, from } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StationListService } from 'src/app/services/station-list.service';

import * as moment from 'moment';

@Component({
  selector: 'app-train-list',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.scss'],
})
export class TrainListComponent implements OnInit, OnDestroy {
  loaderToShow: any;
  train
  activeTrains;
  error = '';
  dataLoading = false;

  reloadTrainsListSubscription: Subscription;

  constructor(
    private router: Router,
    public loadingController: LoadingController,
    public stationListService: StationListService,
    private trainDescriptionService: TrainDescriptionService,
    private trainListService: TrainListService) {

    this.reloadTrainsListSubscription = this.trainListService.reloadTrainsList.subscribe(res => {
      console.log('Reload trains data subscription')
      this.fetchActiveTrain()
    });

    this.train = this.trainDescriptionService.train;
  }

  ngOnInit() {
    this.fetchActiveTrain()
  }

  describeTrain(trip) {
    this.trainDescriptionService.chosenTrip = trip
    console.log(this.trainDescriptionService.chosenTrip)
    this.processCards(trip)
    this.trainDescriptionService.trainRefreshed.next()
    this.router.navigateByUrl('tabs/trainDesc/tab1');
  }

  processCards(trip) {
    this.trainDescriptionService.cards = []
    if (trip['Transfer1']) {
      this.trainDescriptionService.cards.push(
        {
          station1: this.populateStationWise(trip, 'Origin'),
          common: this.processCommonData(trip, ''),
          station2: this.populateStationWise(trip, 'Transfer1'),
          extraHidden: true
        }
      )

      if (trip['Transfer2']) {
        this.trainDescriptionService.cards.push(
          {
            station1: this.populateStationWise(trip, 'Transfer1'),
            common: this.processCommonData(trip, 'Conn1'),
            station2: this.populateStationWise(trip, 'Transfer2'),
            extraHidden: true
          }
        )

        this.trainDescriptionService.cards.push(
          {
            station1: this.populateStationWise(trip, 'Transfer2'),
            common: this.processCommonData(trip, 'Conn2'),
            station2: this.populateStationWise(trip, 'Destination'),
            extraHidden: true
          }
        )

      } else {
        this.trainDescriptionService.cards.push(
          {
            station1: this.populateStationWise(trip, 'Transfer1'),
            common: this.processCommonData(trip, 'Conn1'),
            station2: this.populateStationWise(trip, 'Destination'),
            extraHidden: true
          }
        )
      }

    } else {
      this.trainDescriptionService.cards.push(
        {
          station1: this.populateStationWise(trip, 'Origin'),
          common: this.processCommonData(trip, ''),
          station2: this.populateStationWise(trip, 'Destination'),
          extraHidden: true
        }
      )
    }
    console.log(this.trainDescriptionService.cards)
  }

  populateStationWise(trip, station) {
    let parsed;
    if (station.includes('Transfer')) {
      parsed = {
        name: trip[station],
        datetime: trip[station + 'ArrTime'],
        ID: trip[station + 'StationID'],
        depttime: trip[station + 'DeptTime'],
        arrtime: trip[station + 'ArrTime'],
        ppi: this.getPlatformIndex(),
        ppiColor: 'white'
      }

      if (['#abb705'].includes(parsed.ppi)) {
        parsed.ppiColor = 'black';
      }
    } else {
      parsed = {
        name: trip[station],
        datetime: trip[station + 'DateTime'],
        ID: trip[station + 'ID'],
        depttime: trip[station + 'Time'],
        ppi: this.getPlatformIndex(),
        ppiColor: 'white'
      }
    }
    if (['#abb705', 'lightred'].includes(parsed.ppi)) {
      parsed.ppiColor = 'black';
    }

    return parsed;
  }

  processCommonData(trip, stage = '') {
    let params = ['Direction', 'BranchID', 'DestinationNote', 'Direction',
      'OriginNote', 'Peak', 'Reason', 'StationStops', 'StationStopsID',
      'Track', 'TrainName', 'TrainStatus']
    let commonRes = {}

    params.forEach(p => {
      commonRes[p] = trip[p + stage]
    })

    commonRes['stopLeft'] = []
    commonRes['ScheduleTime'] = []
    commonRes['ActualTime'] = []
    commonRes['EstimatedScheduleTime'] = []
    commonRes['StatusDesc'] = []
    commonRes['cars'] = []
    return commonRes;
  }

  fetchActiveTrain() {
    this.activeTrains = []
    if (this.trainListService.originStation.StationName == this.trainListService.destinationStation.StationName) {
      this.error = 'Origin station and destination station are the same.';
      return;
    }
    this.error = '';
    this.dataLoading = true;

    this.trainListService.fetchActiveTrains().subscribe((res: any) => {
      this.dataLoading = false;
      if (!res || !res['GetTripStatusJsonResult'] || res['GetTripStatusJsonResult'].length == 0) {
        this.error = 'No trains are available.';
      } else {
        this.activeTrains = this.processListOfTrains(res);
      }

    }, (error) => {
      this.dataLoading = false;
      this.error = 'Could not retreive the list.';
    })
  }

  processListOfTrains(res) {

    let currentDate = moment(this.trainListService.dtime)
    let buffDate = [currentDate.valueOf() - (1800 * 1000), currentDate.valueOf() + (5400 * 1000)]

    console.log(currentDate)
    
    let keepTrains = []
    res['GetTripStatusJsonResult'].forEach(train => {
     
      let originTime = moment(train.OriginDateTime)
      let destTime = moment(train.DestinationDateTime)

      if (originTime && destTime) {
        let oT = originTime.valueOf()
        let dT = destTime.valueOf()
        let ct = currentDate.valueOf()

        if ((oT > buffDate[0] && oT < buffDate[1]) || (dT > ct && dT < buffDate[1])) {
          keepTrains.push(train)
        }
      }
    });

    return keepTrains
  }

  // formAday(time, y, m, d) {
  //   let hr = time.split(':')[0]
  //   let min = time.split(':')[1].split(' ')[0]
  //   let ampm = time.split(':')[1].split(' ')[1]
  //   console.log(hr, min, ampm)
  //   console.log(y, m, d)

  //   let checkdate = new Date()
  //   checkdate.setFullYear(y)
  //   checkdate.setMonth(m)
  //   checkdate.setUTCDate(d)
  //   checkdate.setHours(hr + (ampm == 'PM' ? 12 : 0))
  //   checkdate.setMinutes(min)

  //   console.log(checkdate)

  // }

  getPlatformIndex() {
    let color = Math.floor(Math.random() * 3);
    switch (color) {
      case 0: return 'red';
      case 1: return 'green';
      case 2: return '#abb705';
      // case 2: return 'lightred';
    }
  }

  ngOnDestroy() {
    this.reloadTrainsListSubscription.unsubscribe();
  }
}
