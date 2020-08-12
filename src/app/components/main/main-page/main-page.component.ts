import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Order } from 'src/app/models/Order.model';
import { OrderService } from 'src/app/services/order.service';
import { HttpClient } from '@angular/common/http';
import { Notifications } from 'src/app/models/Notifications.model';
import { ChatMessageService } from 'src/app/services/chat-message.service';



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  
  myMessage:string='';
  show:boolean=true;
  imageName:any;
  selectedFile:File;
  reterviedImage:any;
  message:string;
  base64Data:any;
  retriveRespons:any;
  imp:boolean=false;
  next:number = 0 ;
  mymes:string="";
  error:string="";
  card:string="This Option isn't available for You ,please visit My Wallet Page to add your Card";
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
    active:0,
    card:false
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
  notifcation:Notifications={
    id:null , 
    content:'',
    sender:'',
    rec:'admin@gmail.com',
    time:new Date(),
    seen:false,
    accept:false
  }
  load:boolean = false ;
  showing:boolean=false;
  wait:boolean=false;
  dist:number;
  c1=false;c2=false;c3=false;c4=false;c5=false;c6=false;
  loadPage:boolean ;

  constructor(private userService:UserService  , private orderService:OrderService , private http:HttpClient , 
    private chatMessageService : ChatMessageService) { }

  ngOnInit(): void {
    if(this.orderService.loading){
      this.loadPage = this.orderService.loading;
      this.orderService.loading = false;
      setTimeout(() => {
        this.loadPage = false
        this.order.code= this.click();
        this.userService.getUser(sessionStorage.getItem("user")).subscribe(data =>{
        this.user = data;
    });    
      }, 2500);
    }else{
      this.order.code= this.click();
    this.userService.getUser(sessionStorage.getItem("user")).subscribe(data =>{
      this.user = data;
    });
    }
    
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
  
  nextHouse(){
    if(!this.order.payment_method  && this.next === 0){
      this.error = "Please Choose your Payment Method";
    }else if(this.order.payment_method === "Card" && this.user.card === false && this.next === 0){
      this.error = "This Option isn't available for You ,please visit My Wallet Page to add your Card";
    }else if(this.next === 1 && (!this.order.vehicle_type || !this.order.pickup_Location || !this.order.mobile || !this.order.client_name)){
      this.error = "Please Enter your data";
    }else{
      this.error = "";
      this.next ++ ;
      if(this.next === 3){
        this.next = 2;
      }
    }
  }

  public onFileChanged(event){
    this.selectedFile = event.target.files[0];
    this.load = true ;
    this.upload()
    this.show=false;
  }

  public upload(){
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile' , this.selectedFile , this.order.code+'.jpg');
    this.http.post(`https://alafyn20.herokuapp.com/upload` , uploadImageData , {observe:'response'}).subscribe(data => {
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
    this.http.get(`https://alafyn20.herokuapp.com/get/${this.order.code}.jpg`).subscribe(res => {
        this.retriveRespons = res;
        this.base64Data = this.retriveRespons.picBytes;
        this.reterviedImage = 'data:image/jpeg;base64,'+this.base64Data;
        this.load = false ;
      } ,error => {
        this.reterviedImage='';
        this.load = false ;
      });
    }

    removeImage(name){
      this.http.delete(`https://alafyn20.herokuapp.com/deleteImage/${this.order.code}.jpg`).subscribe(data => {
        this.reterviedImage = null;
      })
    }

    calcPrice(){
      if(!this.order.address  && !this.order.car && !this.order.client_name && !this.order.delivery_method && !this.order.discription && !this.order.mobile && !this.order.mobile && !this.order.pickup_Location && !this.order.time && !this.order.vehicle_type){
          this.mymes = "please Enter your data !";
      }else if(!this.reterviedImage){
        this.mymes = "please Enter the Image of your Order!"
      }else{
        this.mymes = "";
        this.wait = true;
      this.getDistance(this.order.pickup_Location , this.order.address);
      setTimeout(() => {
        if(this.dist){
          this.wait = false;
          this.showing = true ;
        }else{
          this.wait = false ;
          this.removeImage(this.order.code);
          this.show = true;
          alert("check your internet please !");
        }
      }, 5000);
      }
    }

    calcHomePrice(){
      if(!this.order.address  && !this.order.car && !this.order.client_name && !this.order.delivery_method && !this.order.discription && !this.order.mobile && !this.order.mobile && !this.order.pickup_Location && !this.order.time && !this.order.vehicle_type){
          this.mymes = "please Enter your data !";
      }else{
        this.mymes = "";
        this.wait = true;
      this.getDistance(this.order.pickup_Location , this.order.address);
      setTimeout(() => {
        if(this.dist){
          this.wait = false;
          this.showing = true ;
        }else{
          this.wait = false ;
          this.show = true;
          alert("check your internet please !");
        }
      }, 5000);
      }
    }

    refuse(){
      this.showing = false;
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
      this.removeImage(this.order.code);
    }

  addOrder(){
    if(this.order.delivery_method === "Move Your House"){
      this.order.discription = `*${this.c1} *${this.c2} *${this.c3} *${this.c4} *${this.c5} *${this.c6}  `;
      this.userService.getUser(sessionStorage.getItem("user")).subscribe(data => {
        this.order.user = data;
        this.orderService.addOrder(sessionStorage.getItem("user"),this.order).subscribe(data => {
          this.sendNotification();
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
          this.show = true;
        })
      }); 
    } else{
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
          this.show = true;
          this.sendNotification();
        } , error => {
          this.http.delete(`https://alafyn20.herokuapp.com/deleteImage/${this.order.code}.jpg`).subscribe(data => {});
        });
      }
  }

  getDistance(from ,to) {
  
      if ( !this.order.pickup_Location || !this.order.address) {
      } else {
          fetch(`http://www.mapquestapi.com/directions/v2/route?key=jO7091FNjRbzA3O9EA7AZD3mt2WRiozb&from=${from},EG&to=${to},EG`)
              .then(result => result.json())
              .then(res => {
                  if (!`${res.route.distance * 1.6}`) {
                      alert("cannot fetch this place");
                  } else {
                      this.dist= res.route.distance * 1.6; 
                      if(this.order.vehicle_type === "MiniVan"){
                        this.order.price = this.dist * 1 * 10 * this.order.car ;
                      }else if(this.order.vehicle_type === "Pickup"){
                        this.order.price = this.dist * 1 * 20 * this.order.car;
                      }else if(this.order.vehicle_type === "Jumbo"){
                        this.order.price = this.dist * 1 * 30 * this.order.car;
                      }else if(this.order.vehicle_type === "Jumbo Closed Body"){
                        this.order.price = this.dist * 1 * 40 * this.order.car;
                      }else if(this.order.vehicle_type === "Flatbed Trailer"){
                        this.order.price = this.dist * 1 * 50 * this.order.car;
                      }
                  }
              })
              .catch(err => { console.log(err) })              
      }
  }

  sendNotification(){
    this.notifcation.content = this.user.username + " add new Order ! please check it .";
    console.log(this.notifcation.rec)
    this.notifcation.sender = sessionStorage.getItem("user");
    this.notifcation.accept= null;
    this.chatMessageService.addNotifications(this.notifcation).subscribe(data => {
      
    });
  }

}
