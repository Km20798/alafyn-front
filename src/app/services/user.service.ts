import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Email } from '../models/Email.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUserByEmailAndPassword(email:string , password:string){
    return this.http.get<User>(`https://alafyn20.herokuapp.com/users/${email}/${password}` );
  }

  createUser(user:User){
    return this.http.post<User>(`https://alafyn20.herokuapp.com/users/reg` , user );
  }

  getUser(email:string){
    return this.http.get<User>(`https://alafyn20.herokuapp.com/users/${email}` );
  }

  getUserByPhone(phone:string){
    return this.http.get<User>(`https://alafyn20.herokuapp.com/users/${phone}` );
  }

  deleteUser(email:string){
    return this.http.delete(`https://alafyn20.herokuapp.com/users/${email}` );
  }

  getAll(){
    return this.http.get<User[]>(`https://alafyn20.herokuapp.com/users`);
  }

  updateUser(email:string , user:User){
    return this.http.put<User>(`https://alafyn20.herokuapp.com/users/${email}` , user );
  }

  sendEmail(email:Email){
    return  this.http.post<Email>(`https://alafyn20.herokuapp.com/sendMail` , email );
  }

  getStoreToWork(country:string){
    return this.http.get<User[]>(`https://alafyn20.herokuapp.com/users/store/${country}`);
  }

}
