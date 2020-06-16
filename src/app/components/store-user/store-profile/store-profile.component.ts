import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-store-profile',
  templateUrl: './store-profile.component.html',
  styleUrls: ['./store-profile.component.css']
})
export class StoreProfileComponent implements OnInit {


  user:User = {
    id:null , 
    username:'',
    email:'',
    password:'',
    phone:'',
    address:{
    city:'',
    country:'0',
    addressDet:''
    },
    role:'',
    active:null
  }
  retriveRespons:any;
  base64Data:any;
  reterviedImage:any;
  reterviedImage2:any;
  reterviedImage3:any;
  reterviedImage4:any;
  personalImage:any;

  constructor(private userService:UserService , private http:HttpClient) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.userService.getUser(sessionStorage.getItem("user")).subscribe(data => {this.user = data; this.getImage()} )
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
