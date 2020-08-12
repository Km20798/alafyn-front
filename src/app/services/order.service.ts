import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/Order.model';
import { User } from '../models/user.model';
import { StoreComponent } from '../components/register/store/store.component';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  loading:boolean = true ; 

  constructor(private http:HttpClient) { }

  GetAllOrders(){
    return this.http.get<Order[]>(`https://alafyn20.herokuapp.com/orders`);
  }

  addOrder(email:string ,  order:Order){
    return this.http.post<Order>(`https://alafyn20.herokuapp.com/orders/${email}` , order);
  }

  findByUser(email:string){
    return this.http.get<Order[]>(`https://alafyn20.herokuapp.com/orders/${email}`);
  }

  findByCode(email:string , code:number){
    return this.http.get<Order>(`https://alafyn20.herokuapp.com/orders/${email}/${code}`);
  }

  findByTimes(email:string , from:Date , to:Date){
    return this.http.get<Order[]>(`https://alafyn20.herokuapp.com/orders/${email}/${from}/${to}`);
  }

  updateOrder(id:number , order:Order){
    return this.http.put<Order>(`https://alafyn20.herokuapp.com/orders/${id}`, order);
  }

  deleteOrder(id:number){
    return this.http.delete(`https://alafyn20.herokuapp.com/orders/${id}`);
  }

  getAllOrderByCampany(email:string){
    return this.http.get<Order[]>(`https://alafyn20.herokuapp.com/orders/stores/${email}`);
  }

}
