import { Component, OnInit } from '@angular/core';
declare var L : any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
// ------------------ Attributes ------------------
  private map: any;
  number:number = 0;
  from:string='' ;
  to:string = '';
  dist:number  ;
  show:boolean=false;
  wait:boolean = false;
  car:number;
  price:number;
  network:string;
  
  //-------------------- Methods ----------------- 
 
  constructor() { }

  ngOnInit(): void {
      this.getDirection(this.from , this.to);
  }

  getDistance() {
    this.network="";
    this.wait = true;
    this.show=false
    this.dist = null ;
    setTimeout(() => {
      this.wait = false;
      this.show = true;
      this.getMyRoad(this.from , this.to);
      this.network="Sorry check your internet and try again";
    }, 7000);
      if ( !this.from || !this.to) {
          console.log('please enter the required field')
      } else {
          fetch(`http://www.mapquestapi.com/directions/v2/route?key=jO7091FNjRbzA3O9EA7AZD3mt2WRiozb&from=${this.from},EG&to=${this.to},EG`)
              .then(result => result.json())
              .then(res => {
                  if (!`${res.route.distance * 1.6}`) {
                      alert("cannot fetch this place");
                  } else {
                      this.dist= res.route.distance * 1.6; 
                      this.price = this.dist * this.car * this.number; 
                  }
              })
              .catch(err => { console.log(err) })
      }
  }
  
  getDirection(from , to){
    L.mapquest.key = 'jO7091FNjRbzA3O9EA7AZD3mt2WRiozb';
    this.map = L.mapquest.map('map', {
        center:{lat:30.06 , lng:31.25},
        layers:L.mapquest.tileLayer('map'),
        zoom: 13
    });       
  }

  getMyRoad(from , to){
    L.mapquest.directions().route({
      start: from,
      end:to
    });
  }

}
