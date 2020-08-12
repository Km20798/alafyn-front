import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatedata',
  templateUrl: './updatedata.component.html',
  styleUrls: ['./updatedata.component.css']
})
export class UpdatedataComponent implements OnInit {

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
    active:0,
    card:false
  };
  num:number=1;
  k:number;

  constructor(private userService:UserService , private router:Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.userService.getUser(sessionStorage.getItem("user")).subscribe(data => {
      this.user = data;
    })
  }

  updateUser(){
    this.userService.updateUser(this.user.email , this.user).subscribe(data => {
      this.router.navigate(['/myProfile']);
    })
  }

  getNext(){
    this.num+=1;
    this.k = null;
  }

  show(){ this.k = 1}
  

}
