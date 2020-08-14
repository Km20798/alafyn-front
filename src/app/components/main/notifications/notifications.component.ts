import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatMessageService } from 'src/app/services/chat-message.service';
import { Notifications } from 'src/app/models/Notifications.model';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications:Notifications[]=[]; 
  user = localStorage.getItem('user');
  load:boolean=true ;

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
