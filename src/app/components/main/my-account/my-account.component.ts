import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order.model';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  user : User = {
    id:null , 
    username:'',
    email:'',
    phone:'',
    password:'',
    address:{
      city:'',
      country:'',
      addressDet:''
    },
    role:'',
    active:0,
    card:false
  }
  from:Date ;
  to:Date ;
  orders:Order[];
  price:number=0;

  constructor(private userService:UserService , private orderService:OrderService) { }

  ngOnInit(): void {
    this.userService.getUser(sessionStorage.getItem("user")).subscribe(data => {
      this.user = data;
    })
  }

  request(){
    this.price = 0;
    this.orderService.findByTimes(sessionStorage.getItem("user"),this.from , this.to).subscribe(data => {
      this.orders = data;
      data.forEach(element => {
        this.price += element.price;
      });
    })
  }

}
