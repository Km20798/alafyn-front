import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  orders:Order[] ;
  order:Order={
    id:null,
    delivery_method:'',
    vehicle_type:'',
    pickup_Location:'',
    mobile:'',
    discription:'',
    client_name:'',
    address:'',
    price:200,
    code:null ,
    payment_method:'',
    time:null,
    user:null
  };
  show:boolean=false;

  imageName:any;
  selectedFile:File;
  reterviedImage:any;
  message:string;
  base64Data:any;
  retriveRespons:any;
  imp:boolean=false;

  constructor(private orderService:OrderService , private http:HttpClient , private router:Router) { }

  ngOnInit(): void {
    this.getAllOrder() 
  }

  click(){
    this.show=false;
    this.imageName=null;
    this.reterviedImage=null;
    this.base64Data = null;
    this.retriveRespons = null;
    this.imp = false;

  }

  getImage(code:number){
    this.http.get(`http://localhost:8081/get/${code}.jpg`).subscribe(res => {
      if(res !== null){
        this.retriveRespons = res;
        this.base64Data = this.retriveRespons.picBytes;
        this.reterviedImage = 'data:image/jpeg;base64,'+this.base64Data;
      }
        
      } ,error => {
        this.reterviedImage='';
      });
    }


  getAllOrder(){
    this.orderService.findByUser(sessionStorage.getItem("user")).subscribe(data => {
      this.orders = data;
    });
  }

  getOrder(code:number){
    this.show = true;

    this.orderService.findByCode(sessionStorage.getItem("user") , code).subscribe(data => {
      this.order = data;
      this.getImage(data.code);
    });
  }

}
