import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order.model';
import { OrderService } from 'src/app/services/order.service';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Notifications } from 'src/app/models/Notifications.model';
import { ChatMessageService } from 'src/app/services/chat-message.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  
  reterviedImage:any;
  base64Data:any;
  retriveRespons:any;
  reterviedImage2:any;
  reterviedImage3:any;
  reterviedImage4:any;
  personalImage:any;
  det:boolean=false;
  load:boolean = false;
  user:User = {
    id:null , 
    username:'',
    email:'',
    password:'',
    phone:'',
    address:{
    city:'',
    country:'',
    addressDet:''
    },
    role:'',
    active:0,
    card:false
  }
  order:Order;
  stompClient: any;
   socket: any;
   messag = [];
   notifcation:Notifications={
    id:null , 
    content:'',
    sender:'',
    rec:'kmaged207@gmail.com',
    time:new Date(),
    seen:false,
    accept:false
  }

  constructor(private http:HttpClient , private userService:UserService ,private router:Router , private orderService:OrderService , private cm:ChatMessageService) { }

  ngOnInit(): void {
    this.getUser();
  }
  onsendMessage() {
    this.stompClient.send('/app/chat', {}, JSON.stringify({content: 'order Acceptted', sender: sessionStorage.getItem('user')}));
  }

  showInfo(){
    this.det = !this.det ;
  }
  back(){
    this.router.navigate([`/search/${sessionStorage.getItem("code")}`])
  }
  okay(){
    this.order.ok = true;
    this.order.company = this.user.email;
    this.orderService.updateOrder(this.order.id , this.order).subscribe(data => {
      this.accept();
      this.sendToCompany();
      this.router.navigate(['/orders']);
    })
  }

  sendToCompany(){
    this.notifcation.content = "Please Check this Order  with Code "+this.order.code+" to finish it";
    this.notifcation.rec = this.user.email;
    this.notifcation.sender = sessionStorage.getItem("user");
    this.notifcation.accept= true;
    this.cm.addNotifications(this.notifcation).subscribe(data => {
      this.router.navigate(['/welcome/admin'])
    });
  }

  accept(){
    this.notifcation.content = "Congratulation your Order by code "+this.order.code +" accepted successfully";
    console.log(this.notifcation.rec)
    this.notifcation.sender = sessionStorage.getItem("user");
    this.notifcation.accept= true;
    this.cm.addNotifications(this.notifcation).subscribe(data => {
      
    });
  }

  findOrder(){
    this.orderService.findByCode(sessionStorage.getItem("user"),Number(sessionStorage.getItem("code"))).subscribe(data => {
      this.order=data;
      console.log(this.order)
    },error => {
      
    });
  }

  chooseRole(){
    if(this.user.role === 'ROLE_USER'){
      this.user.role = 'ROLE_ADMIN';
    }else if(this.user.role === 'ROLE_ADMIN'){
        this.user.role = 'ROLE_USER';
        
    }
    this.userService.updateUser(this.user.email  , this.user).subscribe(data => {
      console.log(this.user.role)
      this.getUser()
    });
  }

  getUser(){
    this.userService.getUser(sessionStorage.getItem("id")).subscribe(data => {
      this.user = data;
      this.findOrder();
      this.getImage();
    })
  } 

  deleteUser(){
    this.userService.deleteUser(this.user.email).subscribe(data =>{
      this.router.navigate(['/users']);
    })
  }

  getImage(){
    this.load = true ;
    let names = ['card-front' , 'card-back' , 'record-front' , 'record-back' , 'logo']
    names.forEach(element => {
      this.http.get(`https://alafyn20.herokuapp.com/get/${this.user.email}${element}`).subscribe(res => {
        this.retriveRespons = res;
        this.base64Data = this.retriveRespons.picBytes;
        if(element === "card-front"){
          this.reterviedImage = 'data:image/jpeg;base64,'+this.base64Data;
        }else if(element === "card-back"){
          this.reterviedImage2 = 'data:image/jpeg;base64,'+this.base64Data;
        }else if(element === "record-front"){
          this.reterviedImage3 = 'data:image/jpeg;base64,'+this.base64Data;
        }else if(element === "record-back"){
          this.reterviedImage4 = 'data:image/jpeg;base64,'+this.base64Data;
        }else if(element === 'logo'){
          this.personalImage = 'data:image/jpeg;base64,'+this.base64Data;
          this.load = false;
        }
      } ,error => {
        this.reterviedImage='';
        this.load = false ;
      });
    });
    
  }


}
