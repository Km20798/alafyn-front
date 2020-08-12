import { Component, OnInit } from '@angular/core';
import { Notifications } from 'src/app/models/Notifications.model';
import { ChatMessageService } from 'src/app/services/chat-message.service';

@Component({
  selector: 'app-notification-store',
  templateUrl: './notification-store.component.html',
  styleUrls: ['./notification-store.component.css']
})
export class NotificationStoreComponent implements OnInit {

  notifications:Notifications[]=[]; 
  user = localStorage.getItem('user');
  load:boolean=true;

  constructor(private chatMessage:ChatMessageService) { }

  ngOnInit(): void {
    this.getAllNotifications();
  }

  
  getAllNotifications(){
    this.chatMessage.getAll(sessionStorage.getItem("user")).subscribe(data => {
      if(data !== null){
        data.forEach(element => {
          this.notifications.unshift(element);
        });
      }
      this.load = false;
    })
  }


}
