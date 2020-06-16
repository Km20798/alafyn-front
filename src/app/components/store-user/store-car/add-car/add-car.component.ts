import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from 'src/app/models/Car.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { CarService } from 'src/app/services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  selectedFile:File ;
  retriveRespons:any;
  base64Data:any;
  reterviedImage:any;
  errorMessage:boolean=false;
  user:User;
  car:Car={id:null,type:'',driver:'',phone:'',user:null};




  constructor( private http:HttpClient , private userService:UserService , private carService:CarService , private router:Router) { }

  ngOnInit(): void {
    this.getUser();
  }


  addCar(){
    this.car.user = this.user;
    this.carService.addCar(this.car).subscribe(data => {});
  }

  getUser(){
    this.userService.getUser(sessionStorage.getItem("user")).subscribe(data => {this.user=data;});
  }

  public onFileChanged(event){
    if(this.car.phone === ''){
      this.errorMessage = true ;
    }else{
      this.selectedFile = event.target.files[0];
      this.upload();
    }
  }
  
  public upload(){
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile' , this.selectedFile , this.car.phone);
    this.http.post(`http://localhost:8081/upload` , uploadImageData , {observe:'response'}).subscribe(data => {
      if(data.status === 200){
        this.getImage();
      }else{
        alert("Error in upload")
      }
    });
  }

  getImage(){
    this.http.get(`http://localhost:8081/get/`+this.car.phone).subscribe(res => {
        this.retriveRespons = res;
        this.base64Data = this.retriveRespons.picBytes;
        this.reterviedImage = 'data:image/jpeg;base64,'+this.base64Data;
        
      } ,error => {
        this.reterviedImage='';
      });
    }

}
