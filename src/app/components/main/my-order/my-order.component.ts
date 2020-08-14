import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  doneOrders:Order[] ;
  waitOrders:Order[] ;
  newOrders:Order[] ;
  order:Order={
    id:null,
    delivery_method:'',
    vehicle_type:'',
    pickup_Location:'',
    mobile:'',
    discription:'',
    client_name:'',
    address:'',
    price:200,
    code:null ,
    payment_method:'',
    time:null,
    car:null,
    ok:false,
    company:'',
    done:false,
    user:null
  };
  show:boolean=false;
  load:boolean = false ;
  imageName:any;
  selectedFile:File;
  reterviedImage:any;
  message:string;
  base64Data:any;
  retriveRespons:any;
  imp:boolean=false;
  done:boolean=true;
  wait:boolean=false;
  new:boolean=false;
  loaded:boolean = false;
  constructor(private orderService:OrderService , private http:HttpClient , private router:Router) { }

  ngOnInit(): void {
    
    this.getAllOrder() 
  }

  click(){
    this.show=false;
    this.imageName=null;
    this.reterviedImage=null;
    this.base64Data = null;
    this.retriveRespons = null;
    this.imp = false;

  }

  getImage(code:number){
    this.load = true ;
    this.http.get(`https://alafyn20.herokuapp.com/get/${code}.jpg`).subscribe(res => {
      if(res !== null){
        this.retriveRespons = res;
        this.base64Data = this.retriveRespons.picBytes;
        this.reterviedImage = 'data:image/jpeg;base64,'+this.base64Data;
        this.load = false;
      }else{
        this.load = false;
      }
        
      } ,error => {
        this.reterviedImage='';
        this.load = false ;
      });
    }


  getAllOrder(){
    this.show = false ;
    this.orderService.findByUser(sessionStorage.getItem("user")).subscribe(data => {
      this.newOrders = [];
      this.doneOrders = [];
      this.waitOrders = [];
      if(data !== null){
        data.forEach(element => {
          if(element.ok === false){
            this.newOrders.unshift(element);
          }else if(element.ok === true && element.done === false){
            this.waitOrders.unshift(element);
          }else if(element.ok === true , element.done === true){
            this.doneOrders.unshift(element);
          }
        });
      }
    });
  }

  dis:any;

  getOrder(code:number){
    this.loaded = true ;
    this.show = true ;
    setTimeout(() => {
      this.loaded = false ;
    }, 1000);
    this.orderService.findByCode(sessionStorage.getItem("user") , code).subscribe(data => {
      this.dis = data.discription.split(' ');
      this.order = data;
      let x = [];
      this.dis.forEach(element => {
        if(element === "*true"){
          x.push(element);
        }
      });
      this.order.discription = x.toString();

      this.getImage(data.code);
    });
  }

  removeImage(id:number , name:string){

    this.http.delete(`https://alafyn20.herokuapp.com/deleteImage/${id}/${name}`).subscribe(data =>{});
  }

  remove(id:number , name:string){
    this.orderService.deleteOrder(id).subscribe(data => {this.getAllOrder();});
    this.removeImage(id , name+'jpg');
  }

  getDone(){
    this.done=true;
    this.new=false;
    this.wait=false;
  }
  getWait(){
    this.done=false;
    this.new=false;
    this.wait=true;
  }
  getNew(){
    this.done=false;
    this.new=true;
    this.wait=false;
  }
}
