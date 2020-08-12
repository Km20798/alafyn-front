import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:User[]=[];
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
  }
  email:string;
  username:string;
  message:string='';
  constructor(private userService:UserService , private router:Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.userService.getAll().subscribe(data => {
      this.users=[];
      data.forEach(element => {
        if(element.role === 'ROLE_USER'){
          
          this.users.unshift(element);
        }
      });
    });
  }

  update(email:string ){
    this.userService.getUser(email).subscribe(data => {
      console.log(data);
      this.user = data;
      this.user.role = "ROLE_ADMIN";
      this.userService.updateUser(email,this.user).subscribe(d => {
        console.log(d);
      })
    });
  }
  
  getUser(username , email){
    sessionStorage.setItem("id" , email);
    this.router.navigate([`/users/${username}`]);
  }


  findByEmail(){
    this.users.forEach(element => {
      if(element.email === this.email){
        sessionStorage.setItem("id" , this.email);
        this.router.navigate([`/users/${this.username}`]);
      }else{
        this.message = "this user isn't exit"
        setTimeout(() => {
          this.message = ""
        }, 3000);
      }
    });
    
  }
}
