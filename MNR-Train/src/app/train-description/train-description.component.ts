import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-train-description',
  templateUrl: './train-description.component.html',
  styleUrls: ['./train-description.component.scss'],
})
export class TrainDescriptionComponent implements OnInit {

  title = ''
  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.paramMap.get("trainNumber");
  }

}
