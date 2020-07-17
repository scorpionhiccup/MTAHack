import { Component } from '@angular/core';
import { TrainDescriptionService } from '../services/train-description.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  train
  constructor(private trainDescriptionService: TrainDescriptionService) {
    this.train = this.trainDescriptionService.train
  }

}
