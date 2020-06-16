import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order.model';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order-found',
  templateUrl: './order-found.component.html',
  styleUrls: ['./order-found.component.css']
})
export class OrderFoundComponent implements OnInit {


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
  stompClient: any;
   socket: any;
   messag = [];
  // @ViewChild('sendMessage') messsages: NgForm ;

  imageName:any;
  selectedFile:File;
  reterviedImage:any;
  message:string;
  base64Data:any;
  retriveRespons:any;
  imp:boolean=false;

  constructor(private orderService:OrderService , private router:Router,private http:HttpClient , private userService:UserService) { }

  ngOnInit(): void {
    this.connected();
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
    // this.messsages.reset();
  }

  getCompayData(email:string){
    this.userService.getUser(email).subscribe(data => {
      sessionStorage.setItem("id" , email);
      this.router.navigate([`/company/${data.username}`]);
    });
  }

}
