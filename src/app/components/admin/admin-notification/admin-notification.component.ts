import { Component, OnInit } from '@angular/core';
import { Notifications } from 'src/app/models/Notifications.model';
import { ChatMessageService } from 'src/app/services/chat-message.service';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.css']
})
export class AdminNotificationComponent implements OnInit {
  
  notifications:Notifications[]=[]; 
  

  constructor(private chatMessage:ChatMessageService) { }

  ngOnInit(): void {
    this.getAllNotifications();
  }

getAllNotifications(){
  this.chatMessage.getAll("admin@gmail.com").subscribe(data => {
    data.forEach(element => {
      this.notifications.unshift(element);
    }); 
  })
  
}

}
