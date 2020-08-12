import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notifications } from '../models/Notifications.model';

@Injectable({
  providedIn: 'root'
})
export class ChatMessageService {

  constructor(private http:HttpClient) { }
  
  addNotifications(notifcation:Notifications){
    return this.http.post<Notifications>("https://alafyn20.herokuapp.com/notifications" , notifcation);
  }

  getAll(recever:string){
   return this.http.get<Notifications[]>(`https://alafyn20.herokuapp.com/notifications/${recever}`);
  }
  getNotSeen(recever:string , seen:boolean){
    return this.http.get<Notifications[]>(`https://alafyn20.herokuapp.com/notifications/${recever}/${seen}`);
   }
   updateNotifcations(id:number , N:Notifications){
     return this.http.put(`https://alafyn20.herokuapp.com/notifications/${id}` , N);
   }

}
