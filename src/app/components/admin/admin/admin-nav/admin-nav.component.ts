import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { OrderService } from 'src/app/services/order.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

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
    role:"ROLE_USER",
    active:0
  }
  code:number=null;
  reterviedImage:any;
  base64Data:any;
  retriveRespons:any;

  constructor(private userService:UserService , private router:Router , private orderService:OrderService , private auth:AuthService , private http:HttpClient) { }

  ngOnInit(): void {
    this.getUser()
  }

  getImage(){
    this.http.get(`http://localhost:8081/get/`+this.user.email).subscribe(res => {
        if(res !== null){
          this.retriveRespons = res;
          this.base64Data = this.retriveRespons.picBytes;
          this.reterviedImage = 'data:image/jpeg;base64,'+this.base64Data;
        }
      } ,error => {
        this.reterviedImage='';
      });
    }

  getUser(){
    this.userService.getUser(sessionStorage.getItem("user")).subscribe(data => {
      this.user = data;
    })
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  
}
