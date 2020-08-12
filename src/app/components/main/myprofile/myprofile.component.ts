import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  user:User={
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
    active:0,
    card:false
  };
  imageName:any;
  selectedFile:File;
  reterviedImage:any;
  message:string;
  base64Data:any;
  retriveRespons:any;
  imp:boolean=false;
  show:boolean = true;

  constructor(private userService:UserService , private http : HttpClient) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.show = false;
    }, 9000);
    this.getUser();
  }

  
  public onFileChanged(event){
    this.selectedFile = event.target.files[0];
  }

  public upload(){

    if(this.reterviedImage !== null){
      console.log("koko")
      this.http.delete(`https://alafyn20.herokuapp.com/deleteImage/${this.user.email}.jpg`).subscribe(data => {console.log("koko")});
    }

    const uploadImageData = new FormData();
    uploadImageData.append('imageFile' , this.selectedFile , this.user.email);
    this.http.post(`https://alafyn20.herokuapp.com/upload` , uploadImageData , {observe:'response'}).subscribe(data => {
      if(data.status === 200){
        this.imp = false;
        this.getImage();
      }else{
        alert("Error in upload")
      }
    });
  }

  importImage(){
    this.imp = true;
  }
  
  getUser(){
    this.userService.getUser(sessionStorage.getItem("user")).subscribe(data => {
      this.user = data;
      this.getImage();
    });
  }

  getImage(){
    this.http.get(`https://alafyn20.herokuapp.com/get/${this.user.email}`).subscribe(res => {
        if(res !== null){
          this.retriveRespons = res;
          this.base64Data = this.retriveRespons.picBytes;
          this.reterviedImage = 'data:image/jpeg;base64,'+this.base64Data;
        }
      } ,error => {
        this.reterviedImage='';
      });
    }


}
    