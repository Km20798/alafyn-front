import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-orders',
  templateUrl: './store-orders.component.html',
  styleUrls: ['./store-orders.component.css']
})
export class StoreOrdersComponent implements OnInit {

  orders:Order[];
  Orders:Order[];
  done:boolean = true;

  constructor(private orderService:OrderService , private router:Router ) { }

  ngOnInit(): void {
    this.getAllOrder();
  }

  getAllOrder(){
    this.orderService.getAllOrderByCampany(sessionStorage.getItem("user")).subscribe(data => {
      this.orders = [];
      this.Orders = [];
      data.forEach(element => {
        if(element.done === true){
          this.orders.unshift(element);
        }else{
          this.Orders.unshift(element);
        }
      });
    });
  }

  getDone(){
    this.done = true ;
  }

  getWaiting(){
    this.done = false;
  }

  getOrder(code:string){
    this.orderService.findByCode(sessionStorage.getItem("user") , Number(code)).subscribe(data => {
      sessionStorage.setItem("code" , code);
      this.router.navigate([`storeOrders/${code}`]);
    })
  }

}
