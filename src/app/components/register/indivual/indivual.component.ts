import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Email } from 'src/app/models/Email.model';

@Component({
  selector: 'app-indivual',
  templateUrl: './indivual.component.html',
  styleUrls: ['./indivual.component.css']
})
export class IndivualComponent implements OnInit {
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
  page:boolean=false;
  message:boolean = false;
  error:boolean=false;
  code:string;
  showCode:boolean=false;
  theCode:string;

  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }
   
  

  constructor(private userService:UserService , private router:Router) { }

  ngOnInit(): void {
  }

  next(){
    this.page = !this.page;
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

}
