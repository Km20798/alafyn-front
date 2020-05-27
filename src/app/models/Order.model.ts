import { User } from './user.model';

export class Order{
  id:number ;
  delivery_method:string ;
  vehicle_type:string ;
  pickup_Location:string;
  mobile:string;
  discription:string;
  client_name:string;
  address:string;
  price:number;
  code:number;
  payment_method:string;
  time:Date;
  user:User;
}