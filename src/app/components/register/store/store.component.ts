import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Email } from 'src/app/models/Email.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

 

  possible = "1234567890";
  lengthOfCode = 6;
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
  email:Email={
    to:this.user.email,
    subject:'Hi man',
    body:`
    Welcome in Our Application <br> 3lafyn is an application to make your life more easy <hr>
    please Enter this code ` + +` to create new Account .<br><br>
    Thanks for using our Application.:) 
    `
  }
  conPass:string;
  active:boolean=false;
  message:boolean = false;
  error:boolean=false;
  code:string;
  showCode:boolean=false;
  theCode:string;
  page:number=1;


// image
myMessage:string='';
show:boolean=true;
imageName:any;
selectedFile:File;
reterviedImage:any;
base64Data:any;
retriveRespons:any;
imp:boolean=false;





  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }
   
  

  constructor(private userService:UserService , private router:Router , private http:HttpClient) { }

  ngOnInit(): void {
  }

  next(){
    this.page+=1;
  }
  back(){
    this.page-=1;
  }

  createAccount(user){
    this.sendEmail();
    this.theCode = this.makeRandom(this.lengthOfCode, this.possible);
    console.log(this.theCode);
    if(this.sendEmail()){
      this.showCode=true;
    }
  }

  
  sendEmail(){
    this.email.to=this.user.email;
    this.userService.sendEmail(this.email).subscribe(data => {
      console.log(data);
    })
    return true;
  }

  saveAccount(){
    console.log(this.theCode);
    if(this.code === this.theCode){
      this.showCode = false ;
      this.user.role = 'ROLE_STORE';
      this.userService.createUser(this.user).subscribe(data => {
        this.user = data;
        this.error=true;
        setTimeout(() => {
          this.error=false;
          this.router.navigate(['/login']);
        }, 5000);
      });
    }else{
      this.code = null ;
    }
  }

  // public onFileChanged(event){
  //   this.selectedFile = event.target.files[0];
  //   this.upload()
  //   this.show=false;
  // }

  // public upload(){
  //   const uploadImageData = new FormData();
  //   uploadImageData.append('imageFile' , this.selectedFile , this.user.email+'');
  //   this.http.post(`http://localhost:8081/upload` , uploadImageData , {observe:'response'}).subscribe(data => {
  //     if(data.status === 200){
  //       this.imp = false;
  //       this.getImage();
  //     }else{
  //       alert("Error in upload")
  //     }
  //   });
  // }

  // importImage(){
  //   this.imp = true;
  // }

  
  // getImage(){
  //   this.http.get(`http://localhost:8081/get/${ this.user.email}`).subscribe(res => {
  //       this.retriveRespons = res;
  //       this.base64Data = this.retriveRespons.picBytes;
  //       this.reterviedImage = 'data:image/jpeg;base64,'+this.base64Data;
  //     } ,error => {
  //       this.reterviedImage='';
  //     });
  //   }




}
