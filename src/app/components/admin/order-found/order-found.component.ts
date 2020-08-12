import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order.model';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ChatMessageService } from 'src/app/services/chat-message.service';
import {Notifications} from "./../../../models/Notifications.model"

@Component({
  selector: 'app-order-found',
  templateUrl: './order-found.component.html',
  styleUrls: ['./order-found.component.css']
})
export class OrderFoundComponent implements OnInit {

  load:boolean = false ;

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
      active:0  ,
      card:false
    }
  };
  notifcation:Notifications={
    id:null , 
    content:'',
    sender:'',
    rec:'',
    time:new Date(),
    seen:false,
    accept:false
  }
  users:User[];
  showCompany:boolean=false ;

  imageName:any;
  selectedFile:File;
  reterviedImage:any;
  message:string;
  base64Data:any;
  retriveRespons:any;
  imp:boolean=false;

  constructor(private orderService:OrderService , private router:Router,private http:HttpClient , private userService:UserService , private chatMessageService:ChatMessageService) { }

  ngOnInit(): void {
    this.findOrder();
  }

  

  getImage(){
    this.load = true ;
    this.http.get(`https://alafyn20.herokuapp.com/get/${Number(sessionStorage.getItem("code"))}`+'.jpg').subscribe(res => {
        this.retriveRespons = res;
        this.base64Data = this.retriveRespons.picBytes;
        this.reterviedImage = 'data:image/jpeg;base64,'+this.base64Data;
        this.load = false ;
      } ,error => {
        this.reterviedImage='';
        this.load = false ;
      });
    }

  findOrder(){
    this.orderService.findByCode(sessionStorage.getItem("user"),Number(sessionStorage.getItem("code"))).subscribe(data => {
      this.order=data;
      this.getImage();
    },error => {
      
    });
  }

  aggree(id:number){
    this.order.ok = true;
    this.orderService.updateOrder(id , this.order).subscribe(data => {
    })
  }

  getCompany(country:string){
    this.userService.getStoreToWork(country).subscribe(data => {
      this.users = data;
      if(!this.users){
        this.userService.getAll().subscribe(data => {
          this.users=[];
          data.forEach(element => {
            if(element.role === "ROLE_STORE"){
              this.users.unshift(element);
            }
            
          });
          this.showCompany = true;
        })
      }else{
        this.showCompany = true;
      }
       
      });
  }

  getCompayData(email:string){
    this.userService.getUser(email).subscribe(data => {
      sessionStorage.setItem("id" , email);
      this.router.navigate([`/company/${data.username}`]);
    });
  }

  refuse(){
    this.notifcation.content = "We are sorry . your Order with code "+this.order.code+" doesn't Accept try check your data wasn't correct";
    this.notifcation.rec = this.order.user.email;
    this.notifcation.sender = sessionStorage.getItem("user");
    this.notifcation.accept= false;
    this.chatMessageService.addNotifications(this.notifcation).subscribe(data => {
      this.remove(this.order.id , this.order.code);
      this.router.navigate(['/welcome/admin'])
    });
  }

  removeImage(code:number){

    this.http.delete(`https://alafyn20.herokuapp.com/deleteImage/${this.order.code}.jpg`).subscribe(data =>{});
  }

  remove(id:number , code:number){
    this.orderService.deleteOrder(id).subscribe(data => {});
    this.removeImage(code);
  }

  back(){
    this.showCompany = false;
  }

}
