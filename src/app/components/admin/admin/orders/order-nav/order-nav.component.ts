import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-nav',
  templateUrl: './order-nav.component.html',
  styleUrls: ['./order-nav.component.css']
})
export class OrderNavComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  getAll(){
    this.router.navigate(['/orders']);
  }

  getWaiting(){
    this.router.navigate(['/orders/waiting']);
  }

  getDone(){
    this.router.navigate(['/orders/finished']);
  }

}
