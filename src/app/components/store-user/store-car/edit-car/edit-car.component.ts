import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Car } from 'src/app/models/Car.model';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { CarService } from 'src/app/services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  selectedFile:File ;
  retriveRespons:any;
  base64Data:any;
  reterviedImage:any;
  user:User;
  car:Car={id:null,type:'',driver:'',phone:'',user:null};
  load:boolean=true ;



  constructor( private http:HttpClient , private userService:UserService , private carService:CarService , private router:Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getData(){
    this.carService.getCar(sessionStorage.getItem("user") , Number(sessionStorage.getItem("id"))).subscribe(data => {this.car=data;this.getImage();})
  }

  addCar(){
    this.car.user = this.user;
    this.carService.addCar(this.car).subscribe(data => {
      this.router.navigate([`/cars/${this.car.id}`])
    });
  }

  getUser(){
    this.userService.getUser(sessionStorage.getItem("user")).subscribe(data => {
      this.user=data;this.getData();
      this.load = false;
    });
  }

  showImage(){
    if(this.reterviedImage){
      this.deleteImage();
    }
  }

  public onFileChanged(event){
    this.selectedFile = event.target.files[0];
    this.upload();
  }
  
  public upload(){
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile' , this.selectedFile , this.car.phone);
    this.http.post(`https://alafyn20.herokuapp.com/upload` , uploadImageData , {observe:'response'}).subscribe(data => {
      if(data.status === 200){
        this.getImage();
      }else{
        alert("Error in upload")
      }
    });
  }

  getImage(){
    this.http.get(`https://alafyn20.herokuapp.com/get/${this.car.phone}`).subscribe(res => {
        this.retriveRespons = res;
        this.base64Data = this.retriveRespons.picBytes;
        this.reterviedImage = 'data:image/jpeg;base64,'+this.base64Data;
        
      } ,error => {
        this.reterviedImage='';
      });
    }

    deleteImage(){
      this.http.delete(`https://alafyn20.herokuapp.com/deleteImage/${this.car.phone}`).subscribe(data => {this.reterviedImage=''});
    }
}
