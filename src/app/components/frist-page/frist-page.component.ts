import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-frist-page',
  templateUrl: './frist-page.component.html',
  styleUrls: ['./frist-page.component.css'],
 encapsulation: ViewEncapsulation.Native
})
export class FristPageComponent implements OnInit {
  public images;

  constructor() { }

  ngOnInit(): void {
    this.images = [
      '../../../assets/img/r1.png',
      '../../../assets/img/r3.png',
      '../../../assets/img/r4.png'
    ];
  }

}
