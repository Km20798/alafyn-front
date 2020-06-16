import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Order } from 'src/app/models/Order.model';
import { OrderService } from 'src/app/services/order.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  myMessage:string='';
  show:boolean=true;
  imageName:any;
  selectedFile:File;
  reterviedImage:any;
  message:string;
  base64Data:any;
  retriveRespons:any;
  imp:boolean=false;



  id:number;
  username:string ;
  user : User = {
    id:null , 
    username:'',
    email:'',
    phone:'',
    password:'',
    address:{
      city:'',
      country:'',
      addressDet:''
    },
    role:'',
    active:0
  }
  order:Order={
    id:null,
    delivery_method:'',
    vehicle_type:'',
    pickup_Location:'',
    mobile:'',
    discription:'',
    client_name:'',
    address:'',
    price:null,
    code:null ,
    payment_method:'',
    time:null,
    car:null,
    ok:false,
    company:'',
    done:false,
    user:this.user
  }
  showing:boolean=false;
  wait:boolean=false;
  dist:number;

  constructor(private userService:UserService  , private orderService:OrderService , private http:HttpClient) { }

  ngOnInit(): void {
    this.order.code= this.click();
    this.userService.getUser(sessionStorage.getItem("user")).subscribe(data =>{
      this.user = data;
    });
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }

  click():number{
    let num =  Number(this.makeRandom(4 , '1234567890'));
    return num;
  }
  
  public onFileChanged(event){
    this.selectedFile = event.target.files[0];
    this.upload()
    this.show=false;
  }

  public upload(){

    if(this.reterviedImage !== null){
      this.http.delete(`http://localhost:8081/deleteImage/${this.order.code}.jpg`).subscribe(data => {});
    }

    const uploadImageData = new FormData();
    uploadImageData.append('imageFile' , this.selectedFile , this.order.code+'.jpg');
    this.http.post(`http://localhost:8081/upload` , uploadImageData , {observe:'response'}).subscribe(data => {
      if(data.status === 200){
        this.imp = false;
        this.getImage();
      }else{
        alert("Error in upload")
      }
    });
  }

  importImage(){
    this.imp = true;
  }

  showImage(){
      this.show=true;
  }
  

  getImage(){
    this.http.get(`http://localhost:8081/get/${this.order.code}.jpg`).subscribe(res => {
        this.retriveRespons = res;
        
        this.base64Data = this.retriveRespons.picBytes;
        this.reterviedImage = 'data:image/jpeg;base64,'+this.base64Data;
      } ,error => {
        this.reterviedImage='';
      });
    }

    calcPrice(){
      this.wait = true;
      this.getDistance(this.order.pickup_Location , this.order.address);
      setTimeout(() => {
        if(this.dist){
          this.wait = false;
          this.showing = true ;
        }else{
          this.wait = false ;
          alert("error");
        }
      }, 5000);
    }

  addOrder(){
    
        this.orderService.addOrder(this.user.email , this.order).subscribe(data => {
         this.showing = false;
          this.order.delivery_method='';
          this.order.vehicle_type='';
          this.order.pickup_Location='';
          this.order.mobile='';
          this.order.discription='';
          this.order.client_name='';
          this.order.address='';
          this.order.price=null;
          this.order.payment_method='';
          this.order.time=null;
          this.order.user=this.user;
          this.reterviedImage=null;
          this.order.car = null;
          this.order.code = this.click();
        } , error => {
          this.http.delete(`http://localhost:8081/deleteImage/${this.order.code}.jpg`).subscribe(data => {});
        });
  }

  getDistance(from ,to) {
  
      if ( !this.order.pickup_Location || !this.order.address) {
          console.log('please enter the required field')
      } else {
          fetch(`http://www.mapquestapi.com/directions/v2/route?key=jO7091FNjRbzA3O9EA7AZD3mt2WRiozb&from=${from},EG&to=${to},EG`)
              .then(result => result.json())
              .then(res => {
                  if (!`${res.route.distance * 1.6}`) {
                      alert("cannot fetch this place");
                  } else {
                      this.dist= res.route.distance * 1.6; 
                      if(this.order.vehicle_type === "MiniVan"){
                        this.order.price = this.dist * 1 * 10 ;
                      }else if(this.order.vehicle_type === "Pickup"){
                        this.order.price = this.dist * 1 * 20 ;
                      }else if(this.order.vehicle_type === "Jumbo"){
                        this.order.price = this.dist * 1 * 30 ;
                      }else if(this.order.vehicle_type === "Jumbo Closed Body"){
                        this.order.price = this.dist * 1 * 40 ;
                      }else if(this.order.vehicle_type === "Flatbed Trailer"){
                        this.order.price = this.dist * 1 * 50 ;
                      }
                      // this.price = this.dist * this.car * this.number;
                  }
              })
              .catch(err => { console.log(err) })
              
      }
  }


}
