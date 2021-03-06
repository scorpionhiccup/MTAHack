import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainDescriptionService {
  train = {
    "BranchID": 1,
    "BranchIDConn1": 0,
    "BranchIDConn2": 0,
    "ConnectionCount": 0,
    "DateAsString": "7/15/2020",
    "Destination": "CROTON-HARMON",
    "DestinationAda": 0,
    "DestinationID": 33,
    "DestinationNote": null,
    "DestinationNoteConn1": null,
    "DestinationNoteConn2": null,
    "DestinationTime": "7:35 AM",
    "DestinationZoneStationID": 0,
    "Direction": null,
    "DirectionConn1": null,
    "DirectionConn2": null,
    "Duration": 75,
    "LocationTime": "2020-07-15T07:31:34.1722258Z",
    "NumberOfConnections": 0,
    "Origin": "GRAND CENTRAL",
    "OriginAda": 0,
    "OriginID": 1,
    "OriginNote": null,
    "OriginNoteConn1": null,
    "OriginNoteConn2": null,
    "OriginTime": "6:20 AM",
    "OriginZoneStationId": 0,
    "Peak": "0",
    "PeakConn1": null,
    "PeakConn2": null,
    "Reason": null,
    "ReasonConn1": null,
    "ReasonConn2": null,
    "SchedID": 0,
    "StationStops": "Harlem-125th St.,Yankees-E153 St.,Morris Heights,University Heights,Marble Hill,Spuyten Duyvil,Riverdale,Ludlow,Yonkers,Glenwood,Greystone,Hastings-on-Hudson,Dobbs Ferry,Ardsley-on-Hudson,Irvington,Tarrytown,Philipse Manor,Scarborough,Ossining,Croton-Harmon",
    "StationStopsConn1": null,
    "StationStopsConn2": null,
    "StationStopsID": [
      4,
      622,
      9,
      10,
      11,
      14,
      16,
      17,
      18,
      19,
      20,
      22,
      23,
      24,
      25,
      27,
      29,
      30,
      31,
      33
    ],
    "StationStopsIDConn1": null,
    "StationStopsIDConn2": null,
    "Track": "29",
    "TrackConn1": null,
    "TrackConn2": null,
    "Train1Station1Note": null,
    "Train1Station1NoteRef": null,
    "Train1Station2Note": null,
    "Train1Station2NoteRef": null,
    "Train2Station2Note": null,
    "Train2Station2NoteRef": null,
    "Train2Station3Note": null,
    "Train2Station3NoteRef": null,
    "Train3Station3Note": null,
    "Train3Station3NoteRef": null,
    "Train3Station4Note": null,
    "Train3Station4NoteRef": null,
    "TrainName": "8705",
    "TrainNameConn1": null,
    "TrainNameConn2": null,
    "TrainStatus": "On Time",
    "TrainStatusConn1": null,
    "TrainStatusConn2": null,
    "Transfer1": null,
    "Transfer1ArrTime": null,
    "Transfer1DeptTime": null,
    "Transfer1StationAda": 0,
    "Transfer1StationID": 0,
    "Transfer2": null,
    "Transfer2ArrTime": null,
    "Transfer2DeptTime": null,
    "Transfer2StationAda": 0,
    "Transfer2StationID": 0,
    "Bike": 0,
    "BikeDescription": null,
    "OriginDateTime": "2020-07-15T06:20:00",
    "DestinationDateTime": "2020-07-15T07:35:00",
    "OriginETA": "6:20 AM",
    "Train1MinutesLate": 0,
    "Train2MinutesLate": 0,
    "Train3MinutesLate": 0
  }
  chosenTrip
  cards = [];
  trainRefreshed = new Subject()
  constructor(private httpClient: HttpClient) { }

  fetchLiveTrainInfo(train: number) {
    let trainUrl = 'https://mnorthstg.prod.acquia-sites.com/wse/Mymnr/v5/api/train/'
      + train + '/9de8f3b1-1701-4229-8ebc-346914043f4a/'
    return this.httpClient.get(trainUrl)
  }
}
