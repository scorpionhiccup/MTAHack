import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Station } from '../models/station.model';
import { Subject } from 'rxjs';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TrainListService {
  reloadTrainsList = new Subject()
  originStation: Station;
  destinationStation: Station;
  dtime;

  trainList = []
  
  constructor(private httpClient: HttpClient) {
    this.originStation = { "BranchID": 1, "StationName": "GRAND CENTRAL", "StationID": 1, "ZoneStationID": 1 }
    this.destinationStation = { "BranchID": 2, "StationName": "SOUTHEAST", "StationID": 94, "ZoneStationID": 163 }

    
    this.dtime = moment().toDate().toISOString()
    
  }

  fetchActiveTrains(origin = this.originStation, destination= this.destinationStation, dtime = this.dtime) {
    let datee = moment(dtime)
    let url = 'https://mnorthstg.prod.acquia-sites.com/wse/MYmta/Trains/v4/'
    + origin.StationID +'/'
    + destination.StationID + '/'
    + '0/'
    + datee.year()+ '/'
    + (datee.month() + 1) + '/'
    + datee.date() + '/'
    + '0000/'
    // :pOrigId/:pDestId/:sortBy/:pYear/:pMonth/:pDay/:pTime/
    + '9de8f3b1-1701-4229-8ebc-346914043f4a/TripStatus24'
    console.log(url)
    return this.httpClient.get(url)
  }
  
}
