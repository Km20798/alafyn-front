import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order.model';
import { OrderService } from 'src/app/services/order.service';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

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
    active:0
  }
  order:Order;
  stompClient: any;
   socket: any;
   messag = [];

  constructor(private http:HttpClient , private userService:UserService ,private router:Router , private orderService:OrderService) { }

  ngOnInit(): void {
    this.getUser();
  }

  connected() {
    this.socket = new SockJS('http://localhost:8081/chat');
    this.stompClient = Stomp.over(this.socket);

    const _this = this;

    _this.stompClient.connect({}, function(frame) {
      console.log('................Connected: ' + frame);

      _this.stompClient.subscribe('/topic/mes', function(res) {
        let data = JSON.parse(res.body);
        _this.messag.push(data);
      });

    });
}

  onsendMessage() {
    this.stompClient.send('/app/chat', {}, JSON.stringify({content: 'order Acceptted', sender: sessionStorage.getItem('user')}));
  }

  showInfo(){
    this.det = true ;
  }
  back(){

  }
  okay(){
    this.order.ok = true;
    this.order.company = this.user.email;
    this.orderService.updateOrder(this.order.id , this.order).subscribe(data => {
      this.onsendMessage()   
      this.router.navigate(['/orders']);
    })
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
      this.connected();
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
    let names = ['card-front' , 'card-back' , 'record-front' , 'record-back' , '']
    names.forEach(element => {
      this.http.get(`http://localhost:8081/get/${this.user.email}${element}`).subscribe(res => {
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
        }else if(element === ''){
          this.personalImage = 'data:image/jpeg;base64,'+this.base64Data;
        }
      } ,error => {
        this.reterviedImage='';
      });
    });
    
  }


}
