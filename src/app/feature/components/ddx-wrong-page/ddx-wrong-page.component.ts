import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-ddx-wrong-page',
  templateUrl: './ddx-wrong-page.component.html',
  styleUrls: ['./ddx-wrong-page.component.scss']
})
export class DdxWrongPageComponent implements OnInit {

  constructor(private location: Location) { }
  backClicked() {
    this.location.back();
  }
  ngOnInit(): void {
  }

}
