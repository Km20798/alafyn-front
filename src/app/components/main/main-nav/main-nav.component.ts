import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ChatMessageService } from 'src/app/services/chat-message.service';
import { Notifications } from '../../../models/Notifications.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  id:number;
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
  numNot:number = 0 ;
  showNot:boolean=false;
  show:boolean=false;
  notifcations:Notifications[]=[];
  display:boolean=false;

  constructor(private router:Router , private auth:AuthService , private userService:UserService 
    , private ns:ChatMessageService , private os:OrderService ) {
     }

  ngOnInit(): void {
    this.userService.getUser( sessionStorage.getItem("user")).subscribe(data =>{
      this.user = data;
      this.display = true;
    });
    this.getNewNotifcation();
    
  }

  getNewNotifcation(){
        this.ns.getNotSeen(sessionStorage.getItem("user") , false).subscribe(data => {
          this.notifcations = data;
          if(this.notifcations){
            data.forEach(element => {
              this.numNot+=1;
            });
          }
        })
  }
  click(){
    if(this.showNot === true){
      this.showNot = false;
    }
    this.show=!this.show;
  }
  remove(){
    
    this.show = false;
    
  }
  logout(){
    this.os.loading = true;
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  getNewNotifactions(){
    this.numNot = 0;
    this.showNot = !this.showNot;
    if(this.notifcations){
      this.notifcations.forEach(element => {
        this.updateNotifcation(element);
      });
    }
    this.getNewNotifcation();
  }

  updateNotifcation(notication:Notifications){
    this.ns.updateNotifcations(notication.id , notication).subscribe(data => {
    })
  }

}
