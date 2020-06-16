import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //----------------- Attributes ----------------------
  
      //---------- field used to login --------------------
      email:string;
      password:string;
      loading:boolean =false ;
      id:number;
      error: string;
      //------------------ class --------------
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
        active:0
      }
      //------------------ Methods ------------------------
      constructor(private userService:UserService , private router:Router , private auth:AuthService ) { }

  ngOnInit(): void {
  }

  getUserByEmailAndPassword(event){
    
   if(!this.email || !this.password){
      if(!this.email){
        this.error = 'Please Enter your Email';
      }else{
        this.error = 'please Enter your Passsword';
      }
   }else{
    this.auth.excuteJWTAuthenticationServices(this.email , this.password).subscribe(data =>{
      this.loading = true ;
      setTimeout(() => {
        this.userService.getUser(this.email).subscribe(data => {
          if(data.role === "ROLE_USER"){
            this.router.navigate(['/welcome']);
          }else if(data.role === "ROLE_ADMIN"){
            this.router.navigate(['/welcome/admin']);
          }else if(data.role === "ROLE_STORE"){
            this.router.navigate(['/store/welcome']);
          }else{
            this.router.navigate(['/login']);
          }
        });
      }, 1000);
      
    },error => {
      this.error = "Invalid User";
      this.email=null;
      this.password=null; 
      setTimeout(() => {
        this.error=null;
      }, 5000);
    });
   }
  }
}
