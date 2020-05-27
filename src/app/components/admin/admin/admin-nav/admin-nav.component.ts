import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  user:User;
  code:number=null;

  constructor(private userService:UserService , private router:Router , private orderService:OrderService , private auth:AuthService) { }

  ngOnInit(): void {
    this.getUser()
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

  findOrder(){
    this.orderService.findByCode(sessionStorage.getItem("user"),this.code).subscribe(data => {
      sessionStorage.setItem("code" , this.code+'');
      this.router.navigate([`/search/${data.code}`]);
    },error => {
      alert("No Order With "+ this.code );
    });
  }
}
