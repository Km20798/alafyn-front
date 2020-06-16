import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-frist-page',
  templateUrl: './frist-page.component.html',
  styleUrls: ['./frist-page.component.css']
})
export class FristPageComponent implements OnInit {

  //--------------------- Methods ------------------- 
  constructor() { }

  ngOnInit(): void {  }
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
}
