import { Component, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from 'src/app/models/Car.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { CarService } from 'src/app/services/car.service';
import { Router } from '@angular/router';
import { Notifications } from 'src/app/models/Notifications.model';
import { ChatMessageService } from 'src/app/services/chat-message.service';

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
  err:string="";
  load:boolean = false ;
  loadImg:boolean=false ;
  user:User;
  car:Car={id:null,type:'',driver:'',phone:'',user:null};
  notifcation:Notifications={
    id:null , 
    content:'',
    sender:'',
    rec:'admin@gmail.com',
    time:new Date(),
    seen:false,
    accept:false
  }
  exist:boolean = false ;
  image:any;
  done:boolean = false ;
  add:boolean=false ;

  constructor( private http:HttpClient , private userService:UserService , private carService:CarService , private router:Router , private cm:ChatMessageService) { }

  ngOnInit(): void {
    this.getUser();
  }


  addCar(){
    this.done = false ;
    if(!this.car.driver || !this.car.phone || !this.car.type){
      this.err = "Please Enter Your Data !"
    }else if(!this.reterviedImage){
      this.err = "Please Enter car Image !";
    }else{
      this.car.user = this.user;
      this.load=true;
      this.carService.addCar(this.car).subscribe(data => {
        this.sendNotification();
        this.done = true ;
        this.load=false;
        this.car.phone=null ;
        this.car.type = "";
        this.car.driver = "";
        this.reterviedImage = null;
        this.done = false;
        this.add = true;
      } , error => {
        this.deleteImage();   
        this.load=false;    
      });
    }    
  }

  deleteImage(){
    this.http.delete(`https://alafyn20.herokuapp.com/deleteImage/${this.car.phone}`).subscribe(data => {this.reterviedImage=''});
  }

  getUser(){
    this.userService.getUser(sessionStorage.getItem("user")).subscribe(data => {this.user=data;});
  }

  public onFileChanged(event){
    if(this.car.phone === ''){
      this.errorMessage = true ;
    }else{
      this.selectedFile = event.target.files[0];
      this.loadImg = true;
      this.upload();
    }
  }
  
  public upload(){
    this.checkImage(this.car.phone);
    if(this.image === null){
      this.exist = true ;
      this.err = "this phone is used before";
    }else{
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile' , this.selectedFile , this.car.phone);
      this.http.post(`https://alafyn20.herokuapp.com/upload` , uploadImageData , {observe:'response'}).subscribe(data => {
        if(data.status === 200){
          this.getImage(this.car.phone);
        }else{
          alert("Error in upload")
        }
      });
    }
  }

  getImage(name){
    this.http.get(`https://alafyn20.herokuapp.com/get/`+name).subscribe(res => {
        this.retriveRespons = res;
        this.base64Data = this.retriveRespons.picBytes;
        this.reterviedImage = 'data:image/jpeg;base64,'+this.base64Data;
        this.image = this.reterviedImage;
        this.loadImg = false ;
        
      } ,error => {
        this.loadImg = false;
        this.reterviedImage='';
      });
    }

    checkImage(name){
      this.http.get(`https://alafyn20.herokuapp.com/get/`+name).subscribe(res => {
          if(res !== null){
            this.retriveRespons = res;
          this.base64Data = this.retriveRespons.picBytes;
          this.image = 'data:image/jpeg;base64,'+this.base64Data;
          }else{
          }
          
        } ,error => {
          this.reterviedImage='';
        });
      }

    
    sendNotification(){
      this.notifcation.content = this.user.username + " Add new "+ this.car.type +" Car.";
      this.notifcation.sender = this.user.email;
      this.notifcation.accept= null;
      this.cm.addNotifications(this.notifcation).subscribe(data => {
  
      });
    }

}
