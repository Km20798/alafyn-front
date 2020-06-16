import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:Order[];
  code:number;

  constructor(private orderService:OrderService , private router:Router) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(){
    this.orders = [];
    this.orderService.GetAllOrders().subscribe(data => {
      data.forEach(element => {
        if(element.ok  === false){
          this.orders.unshift(element);
        }
      });
    })
  }

  findOrderByCode(){
    this.orderService.findByCode(sessionStorage.getItem("user"),this.code).subscribe(data => {
      sessionStorage.setItem("code" , this.code+'');
      this.router.navigate([`/search/${data.code}`]);
    },error => {
      alert("No Order With "+ this.code );
    });
  }
  
  findOrder(code:number){
    this.orderService.findByCode(sessionStorage.getItem("user"),code).subscribe(data => {
      sessionStorage.setItem("code" , code+'');
      this.router.navigate([`/search/${data.code}`]);
    },error => {
      alert("No Order With "+ code );
    });
  }

}
