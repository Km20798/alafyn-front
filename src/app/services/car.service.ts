import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/Car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http:HttpClient) { }

  getCarByUser(email:string){
    return this.http.get<Car[]>(`https://alafyn20.herokuapp.com/cars/${email}`);
  }

  addCar(car:Car){
    return this.http.post<Car>(`https://alafyn20.herokuapp.com/cars` , car);
  }

  getCar(email:string , id:number){
    return this.http.get<Car>(`https://alafyn20.herokuapp.com/cars/${email}/${id}`);
  }

  deleteCar(id:number){
    return this.http.delete(`https://alafyn20.herokuapp.com/cars/${id}`);
  }

  
}
