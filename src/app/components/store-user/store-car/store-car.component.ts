import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { User } from 'src/app/models/user.model';
import { Car } from 'src/app/models/Car.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-car',
  templateUrl: './store-car.component.html',
  styleUrls: ['./store-car.component.css']
})
export class StoreCarComponent implements OnInit {

  add:boolean=false;
  user:User;
  cars:Car[];

  constructor(private carService:CarService , private userService:UserService , private router:Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getAllByUser(){
    this.carService.getCarByUser(this.user.email).subscribe(data => {this.cars = data;});
  }


  getUser(){
    this.userService.getUser(sessionStorage.getItem("user")).subscribe(data => {this.user=data; this.getAllByUser()});
  }

  showForm(){
    this.getAllByUser();
    this.add = !this.add;
  }

  getCarInfo(id:number){
    sessionStorage.setItem("id" , id+'');
    this.router.navigate([`/cars/${id}`]);
  }

}
