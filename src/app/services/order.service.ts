import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/Order.model';
import { User } from '../models/user.model';
import { StoreComponent } from '../components/register/store/store.component';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  GetAllOrders(){
    return this.http.get<Order[]>(`http://localhost:8081/orders`);
  }

  addOrder(email:string ,  order:Order){
    return this.http.post<Order>(`http://localhost:8081/orders/${email}` , order);
  }

  findByUser(email:string){
    return this.http.get<Order[]>(`http://localhost:8081/orders/${email}`);
  }

  findByCode(email:string , code:number){
    return this.http.get<Order>(`http://localhost:8081/orders/${email}/${code}`);
  }

  findByTimes(email:string , from:Date , to:Date){
    return this.http.get<Order[]>(`http://localhost:8081/orders/${email}/${from}/${to}`);
  }

}
