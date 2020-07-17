import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationListComponent } from './station-list/station-list.component';
import { TrainDescriptionComponent } from './train-description/train-description.component';
import { TrainListComponent } from './train-list/train-list.component';
import { IonicModule } from '@ionic/angular';
import { StationOccupancyComponent } from './station-occupancy/station-occupancy.component';
import { TrainOccupancyComponent } from './train-occupancy/train-occupancy.component';

@NgModule({
  declarations: [StationListComponent, TrainDescriptionComponent, TrainListComponent, StationOccupancyComponent, TrainOccupancyComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
  exports: [StationListComponent, TrainDescriptionComponent, TrainListComponent, StationOccupancyComponent, TrainOccupancyComponent]
})
export class SharedModule { }
