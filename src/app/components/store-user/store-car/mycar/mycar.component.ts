import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/Car.model';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mycar',
  templateUrl: './mycar.component.html',
  styleUrls: ['./mycar.component.css']
})
export class MycarComponent implements OnInit {

  retriveRespons:any;
  base64Data:any;
  reterviedImage:any;
  car:Car={id:null,type:'',driver:'',phone:'',user:null};
  user:User = {id:null,username:'',email:'',password:'',phone:'',address:{city:'',country:'',addressDet:''},role:"ROLE_USER",active:0};


  constructor(private carService:CarService , private router:Router , private http:HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.carService.getCar(sessionStorage.getItem("user") , Number(sessionStorage.getItem("id"))).subscribe(data => {this.car=data;this.user=this.car.user;this.getImage();});
  }

  getImage(){
    this.http.get(`http://localhost:8081/get/${this.car.phone}`).subscribe(res => {
        this.retriveRespons = res;
        this.base64Data = this.retriveRespons.picBytes;
        this.reterviedImage = 'data:image/jpeg;base64,'+this.base64Data;
        
      } ,error => {
        this.reterviedImage='';
      });
    }

  edit(id:number){
    this.router.navigate([`/edit/${id}`]);
  }

  remove(){
    this.carService.deleteCar(this.car.id).subscribe(data => {this.router.navigate(['/cars'])})
  }

}
