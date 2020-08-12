import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<Message[]>('https://alafyn20.herokuapp.com/messages')
  }
  addMessage(message:Message){  
    return this.http.post<Message>('https://alafyn20.herokuapp.com/messages'  ,  message );
  }
  deleteMessage(id:number){
    return this.http.delete(`https://alafyn20.herokuapp.com/messages/${id}`);
  }
  getMessage(id:number){
    return this.http.get<Message>(`https://alafyn20.herokuapp.com/messages/${id}`);
  }
}
