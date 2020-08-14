import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ChatMessageService } from 'src/app/services/chat-message.service';
import { Notifications } from 'src/app/models/Notifications.model';

@Component({
  selector: 'app-store-nav',
  templateUrl: './store-nav.component.html',
  styleUrls: ['./store-nav.component.css']
})
export class StoreNavComponent implements OnInit {

  num:number =null;

  constructor(private auth:AuthService , private router:Router , private ns:ChatMessageService ) { }

  ngOnInit(): void {
    this.getNewNotification();
  }

  getNotification(){
    this.ns.getNotSeen(sessionStorage.getItem("user") , false).subscribe(data => {
     if(data){
      data.forEach(element => {
        this.updateNotifcation(element);
      });
     }
      this.num = null;
      this.router.navigate(['/store/notification']);
    })
    
  }

  getNewNotification(){
    this.ns.getNotSeen(sessionStorage.getItem("user") , false).subscribe(data => {
      if(data){
        this.num = data.length;
      }
    })
  }

  updateNotifcation(notication:Notifications){
    this.ns.updateNotifcations(notication.id , notication).subscribe(data => {
    })
  }


  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
