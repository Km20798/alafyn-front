import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user:User;
  

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  getUser(){
    this.userService.getUser(sessionStorage.getItem("user")).subscribe(data => {
      this.user = data;
    })
  }

}
