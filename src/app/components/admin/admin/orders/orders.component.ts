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

  constructor(private orderService:OrderService , private router:Router) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(){
    this.orderService.GetAllOrders().subscribe(data => {
      this.orders = data;
    })
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
