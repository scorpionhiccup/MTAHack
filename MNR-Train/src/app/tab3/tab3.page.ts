import { Component } from '@angular/core';
import { TrainDescriptionService } from '../services/train-description.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  train
  constructor(private trainDescriptionService: TrainDescriptionService) {
    this.train = this.trainDescriptionService.train
  }

}
