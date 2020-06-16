import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Order } from 'src/app/models/Order.model';

@Component({
  selector: 'app-find-order',
  templateUrl: './find-order.component.html',
  styleUrls: ['./find-order.component.css']
})
export class FindOrderComponent implements OnInit {

 

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
    car:null,
    ok:false,
    company:'',
    done:false,
    user:{
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
      active:0  
    }
  };
  users:User[];
  showCompany:boolean=false ;

  

  imageName:any;
  selectedFile:File;
  reterviedImage:any;
  message:string;
  base64Data:any;
  retriveRespons:any;
  imp:boolean=false;

  constructor(private orderService:OrderService , private router:Router,private http:HttpClient , private userService:UserService) { }

  ngOnInit(): void {
    this.findOrder();
  }

  

  getImage(){
    this.http.get(`http://localhost:8081/get/${Number(sessionStorage.getItem("code"))}`+'.jpg').subscribe(res => {
        this.retriveRespons = res;
        this.base64Data = this.retriveRespons.picBytes;
        this.reterviedImage = 'data:image/jpeg;base64,'+this.base64Data;   
      } ,error => {
        this.reterviedImage='';
      });
    }

  findOrder(){
    this.orderService.findByCode(sessionStorage.getItem("user"),Number(sessionStorage.getItem("code"))).subscribe(data => {
      this.order=data;
      this.getImage();
    },error => {
      
    });
  }

  aggree(){
    this.order.done = true;
    this.orderService.updateOrder(this.order.id , this.order).subscribe(data => {
      this.router.navigate([`/store/orders`]);
    });
  }


  
  
}
