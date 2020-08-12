import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Email } from 'src/app/models/Email.model';

@Component({
  selector: 'app-chage-password',
  templateUrl: './chage-password.component.html',
  styleUrls: ['./chage-password.component.css']
})
export class ChagePasswordComponent implements OnInit {

//-------------------  Attributes   -----------------------
  //---------------   normal fields -----------------------
  possible = "1234567890";
  lengthOfCode = 6;
  mes:string='';
  message:string='';
  message2:string='';
  email:string;
  ok:boolean=false;
  password:string;
  conpass:string;
  code:number;
  codev:number;
  show:boolean = false ;
  load:boolean = false;
  //----------------  classes attribute -------------------- 
  user : User = {
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
  }
  mail:Email={
    to:this.email,
    subject:'Hi man',
    body:`
    Welcome in Our Application.
    3lafyn is an application to make your life more easy 
    ----------------------------------------------------
    please Enter this code ` + this.makeRandom(this.lengthOfCode , this.possible)+` to Update Your Password .
    Thanks for using our Application.:) 
    `
  }
  
  //------------------------------ Methods ---------------------------
   
  constructor(private userService:UserService , private router:Router) { }

  ngOnInit(): void {
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.codev = Number(text);
    return text;
  }
   

  search(){
    this.load = true;
    this.userService.getUser(this.email).subscribe(data => {
      this.load = false;
      this.user = data;
      this.ok = true
      this.message = '';
    } , error => {
      this.load = false ;
      this.message = 'This Email not Exits !' ;
    });
  }

  click(){
    if(this.password === this.conpass){
      this.sendEmail();
      console.log(this.codev)
      this.show = true;
    }else{
      this.message2 = "the Password not equals :("
    }
  }
  sendEmail(){
    this.mail.to = this.email;
    this.userService.sendEmail(this.mail).subscribe(data => {
    })
    return true;
  }

    updateUser(){
      if(Number(this.code) === this.codev){
        this.user.password = this.password;
        this.userService.updateUser(this.email , this.user).subscribe(data => {
          this.router.navigate(['/login']);
        });
      }else{
        this.mes="please check your code";
      }    
    }
    
  
}
