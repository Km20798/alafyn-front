import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chage-password',
  templateUrl: './chage-password.component.html',
  styleUrls: ['./chage-password.component.css']
})
export class ChagePasswordComponent implements OnInit {

  user : User = {
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
  email:string;
  ok:boolean=false;
  password:string;
  conpass:string;


  constructor(private userService:UserService , private router:Router) { }

  ngOnInit(): void {
  }

  search(){
    this.userService.getUser(this.email).subscribe(data => {
      this.user = data;
      this.ok = true
    });
  }
    updateUser(){
      this.user.password=this.password;
      this.userService.updateUser(this.email , this.user).subscribe(data => {
        this.router.navigate(['/login']);
      })
    }
    
  
}
