import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/Car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http:HttpClient) { }

  getCarByUser(email:string){
    return this.http.get<Car[]>(`http://localhost:8081/cars/${email}`);
  }

  addCar(car:Car){
    return this.http.post<Car>(`http://localhost:8081/cars` , car);
  }

  getCar(email:string , id:number){
    return this.http.get<Car>(`http://localhost:8081/cars/${email}/${id}`);
  }

  deleteCar(id:number){
    return this.http.delete(`http://localhost:8081/cars/${id}`);
  }

  
}
