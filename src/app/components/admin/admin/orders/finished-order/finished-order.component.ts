import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order.model';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-finished-order',
  templateUrl: './finished-order.component.html',
  styleUrls: ['./finished-order.component.css']
})
export class FinishedOrderComponent implements OnInit {

 
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
        if(element.ok  === true && element.done === true){
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
