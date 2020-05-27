import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-found',
  templateUrl: './order-found.component.html',
  styleUrls: ['./order-found.component.css']
})
export class OrderFoundComponent implements OnInit {


  order:Order;

  imageName:any;
  selectedFile:File;
  reterviedImage:any;
  message:string;
  base64Data:any;
  retriveRespons:any;
  imp:boolean=false;

  constructor(private orderService:OrderService , private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.findOrder();
    this.getImage();
  }

  getImage(){
    this.http.get(`http://localhost:8081/get/${Number(sessionStorage.getItem("code"))}`).subscribe(res => {
        console.log(res);
        this.retriveRespons = res;
        console.log(this.retriveRespons);
        this.base64Data = this.retriveRespons.picBytes;
        console.log(this.base64Data); 
        this.reterviedImage = 'data:image/jpeg;base64,'+this.base64Data;
        
      } ,error => {
        this.reterviedImage='';
      });
    }

  findOrder(){
    this.orderService.findByCode(sessionStorage.getItem("user"),Number(sessionStorage.getItem("code"))).subscribe(data => {
      this.order=data;
      console.log(data);
    },error => {
      
    });
  }

}
