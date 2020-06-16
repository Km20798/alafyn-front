import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getuser',
  templateUrl: './getuser.component.html',
  styleUrls: ['./getuser.component.css']
})
export class GetuserComponent implements OnInit {


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

  constructor(private http:HttpClient , private userService:UserService ,private router:Router) { }

  ngOnInit(): void {
    this.getUser();
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

    getDetailes(){
      this.det=!this.det ;
    }

}
