import { Component, OnInit, ViewChild } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  stompClient: any;
  socket: any;

  @ViewChild('sendMessage') messsages: NgForm ;

  messag = [];
  user = localStorage.getItem('user');


  constructor() { }

  ngOnInit(): void {
    this.connected();
  }

  
  connected() {
    let id =  '1234';
    if(id == '1234'){
    this.socket = new SockJS('http://localhost:8081/chat');
    this.stompClient = Stomp.over(this.socket);

    const _this = this;

    _this.stompClient.connect({}, function(frame) {
      console.log('................Connected: ' + frame);

      _this.stompClient.subscribe('/topic/mes', function(res) {
        let data = JSON.parse(res.body);
        console.log('i am user receive note');
        console.log(data.content);
        _this.messag.push(data.content);
      });

    });
  }
}

onsendMessage() {
  this.stompClient.send('/app/chat', {}, JSON.stringify({content: this.messsages.value.message, sender: localStorage.getItem('user')}));
  this.messsages.reset();
}


}
