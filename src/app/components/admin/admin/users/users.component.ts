import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:User[];
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
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.userService.getAll().subscribe(data => {
      this.users = data;
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
  

}
