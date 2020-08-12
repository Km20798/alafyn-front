import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';
import { Notifications } from 'src/app/models/Notifications.model';
import { ChatMessageService } from 'src/app/services/chat-message.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  //-------------------------- Attributes ----------------------

  //--------------------- Attribute --------------------

  latitude: 51.678418;
  longitude: 7.809007;
  message:string;
  okay:boolean=false;
  //------------------- class ------------------- 
  mes:Message= {
    id:null,
    username:'' ,
    email:'',
    message:'',
    date:new Date()
  };
  notifcation:Notifications={
    id:null , 
    content:'',
    sender:'',
    rec:'admin@gmail.com',
    time:new Date(),
    seen:false,
    accept:false
  }
 
  // -------------------------------  Methods ------------------------

  constructor(private service:MessageService , private router:Router , private chatMessageService:ChatMessageService) { }

  ngOnInit(): void {
  }

  Warn() {
    alert ("Your Message is sent successfully");
 }

  onSubmit(){
    this.service.addMessage(this.mes).subscribe(data => {
      this.sendNotification();
      this.Warn();
    }, error => {
      this.message = 'please Enter your data !';
    });
   
  }

  sendNotification(){
    this.notifcation.content = this.mes.username + " Send new Message. please check it !";
    console.log(this.notifcation.rec)
    this.notifcation.sender = this.mes.email;
    this.notifcation.accept= null;
    this.chatMessageService.addNotifications(this.notifcation).subscribe(data => {

    });
  }

}
