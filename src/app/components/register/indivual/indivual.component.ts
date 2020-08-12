import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Email } from 'src/app/models/Email.model';
import { HttpClient } from '@angular/common/http';
import { Notifications } from 'src/app/models/Notifications.model';
import { ChatMessageService } from 'src/app/services/chat-message.service';

@Component({
  selector: 'app-indivual',
  templateUrl: './indivual.component.html',
  styleUrls: ['./indivual.component.css']
})
export class IndivualComponent implements OnInit {

  // ---------------------- Attributes  --------------------

  countryList: Array<any> = [
    { name: 'Alexandria', cities: ['El Montazah', 'Kafr Abdo', 'Louran' , 'Gleem' , 'Zezeinia' , 'San Stifano' , 'Semoha' , 'El Ibrahimia' , 'Kamb Shizer' , 'El Shatbey' , 'Moharam Bik' , 'Ras El Teen' , 'El Ameriaa' , 'Agamy' , 'El Dekhilaa' , 'Miami' , 'Raml Station' , 'Abees'] },
    { name: 'Aswan', cities: ['Aswan' , 'Edfu' , 'Kom Ombo' , 'Drau' , 'Nasr of Nubia'] },
    { name: 'Asyut', cities: ['Asyut' ,'Dayrut' , 'El Qousiya' , 'Abnoub' , 'Manfalut' , 'Abu Tig' , 'El Ghanayem' , 'Sahel Selim' , 'El Badary' , 'Sadfa' , 'El Fateh'] },
    { name: 'Beheira', cities: ['Rashid' , 'Sprakhet' , 'Itai Gunpowder' , 'Abu Homs' , 'Housh Isa' , 'Kafr al-Dawwar' , 'Delengat' , 'Kom Hamada' , 'Damanhur' , 'Mahmudiyah' , 'Edco' , 'Abu El Matamir' , 'Rahmaniyah' , 'New Nubaria' , 'Wadi Natrun' , 'Badr'] },
    { name: 'Beni Suef', cities: ['Beni Suef ','El Wasta','Nasr','Ehnasia','Bba','Samasta','El Fshn'] },
    { name: 'Cairo', cities: ['Heliopolis' , 'Zamalek' , 'Maadi' , 'El Marg' , 'El Matarya' , 'Ain Shams' , 'El Salam' , 'Nasr City' , 'Monshaat Nasser' , 'El Wailly' , 'Bab El Sheriaa' , 'El Mosky' , 'Azbakia' , 'Abbdeen' , 'Bollak' , 'El Zaytoun' , 'Hadayek El Koba' , 'El Zawya El Hamra' , 'El Sharbiaa' , 'El Sahel' , 'Shobra Masr' , 'El Sayed Zeinab' , 'Masr El Kadimaa' , 'El Khalifa' , 'El Mokatam' , 'El Basateen' , 'Dar El Salam' , 'El Maadi' , 'Helwan' , '15 May' , 'New Cairo' , 'El Rehab City' , 'Madinty' , 'El Shrouk' , '10th of Ramadan City']},
    { name: 'Dakahlia', cities: ['Mansoura','El manzala','Mit Ghamr','El gamalia','Dikirnis','Menit El-nasr','Mit Salsabil','Aja','Talkha','Belqas','Sinbillawain','Sherbin','Bani Ubaid','Tmi El amdid','El matria','Nebroh','Gamasa','El Kurdi','Mahalet EL Dimna'] },
    { name: 'Damietta', cities: ['Dimyat','Faraskour','Kafr Saad','El Zarka','Kafr El Batikh']},
    { name: 'Faiyum', cities: ['Fayoum','Tamia','Snoras','Esta','Ebshwai','Yossef El Sedik'] },
    { name: 'Gharbia', cities: ['Kafr El Zayat','El santa','El Mahalla El Kubra','Basion','Zefta','Samanoud','Tanta','Qutour'] },
    { name: 'Giza', cities: ['El Badrashin','El saf','Atfih','El Aiat','El wahat El baharia','Manshat El Qanater','Awsim','Kerdasa','Abo El namrs']},
    { name: 'Ismailia', cities: ['Ismailia','Fayd','El Qantra Sharq','El Qantra Gharb','El tal El Kabir','Abo Sowir','El kasasin'] },
    { name: 'Kafr El Sheikh', cities: ['Kafr Al sheikh','Desok','Feoa','Motobs','El Brols','El Hamool','Bila','El Ryad','Sedi Salem','Qalin']},
    { name: 'Luxor', cities: ['El Zaytiaa' , 'El Bayapiaa' , 'El Karnaa' , 'Armant' , 'El Toud' , 'Isnaa'] },
    { name: 'Matruh', cities: ['Marsa Matroh','El hamam','El Alamin','El Dabaa','El Ngila','Sedi Brani','El Salom','Siwa']},
    { name: 'Minya', cities: ['Minya','Al-adowa','Maghagha','Bani Mazar','Matai','Samalot','Abo krkas','Maloi','Dir Mowas']} ,
    { name: 'Menofia', cities: ['Shebin El Kom','El Sadat','Menof','Tala','Ashmon','El Bagor','Qawisna','Birkit El Sbe','El Shohda']},
    { name: 'New Valley', cities: ['El Kharga','Paris','El Dakhla','El Frafra','Balat'] },
    { name: 'North Sinai', cities: ['El Kharga','Paris','El Dakhla','El Frafra','Balat'] },
    { name: 'Port Said', cities: ['Port Said' , 'Port Fouad' , 'El Arab' , 'Hay El Shark' , 'El Dawahi' , 'El Zaouhour' , 'El Manakh' , 'Hay Gharb']},
    { name: 'Qalyubia', cities: ['Banhaa' , 'Qaluib' , 'El Kanater El Khairia' , 'Shobra El Khema' , 'El Khankaa' , 'Kafr Shokr' , 'Shebin El Khanater' , 'Tokh' , 'Obour City' , 'Qaha' , 'El Khesous'] },
    { name: 'Qena', cities: ['Qena' , 'Abo Tesht' , 'Nagee Hamady' , 'Deshna' , 'El Wakf' , 'Keft' , 'Naqada' , 'Kous' , 'Farshout']},
    { name: 'Red Sea', cities: ['Ras Ghareb' , 'Hurghada' , 'El kosoir' , 'Safaga' , 'Marsa Alam' , 'Shaiatien' , 'Halaib']},
    { name: 'Sharqia', cities: ['El Ibrahimia','Abu Hammad','Abu Kabir ','Awlad Saqr','Belbeis','El Hussainiya','Derb Negm','Zagazig','Faqous','Kafr Saqr','Mashtol El-soq','Minya Al-Qamh ','Hehia'] },
    { name: 'South Sinai', cities: ['Abo Redes' , 'Abo Zenima' ,'Nuybie' , 'Taba' , 'Ras Sedr' , 'Dahab' , 'Sharm El Shekh' , 'Sant Katrin' , 'Eltor'] },
    { name: 'Suez', cities: ['Suez' , 'El Arbein' , 'Ataka' , 'EL Ganian'] },
  ];
  possible = "1234567890";
  lengthOfCode = 6;
  conPass:string;
  active:boolean=false;
  page:boolean=false;
  message:boolean = false;
  error:boolean=false;
  code:string;
  showCode:boolean=false;
  showImage:boolean=false;
  theCode:string;
  // image
  selectedFile:File;
  reterviedImage:any;
  base64Data:any; 
  retriveRespons:any;
  imp:boolean=false;
  MyMessage:string;
  load:boolean=false;
  // ----------------------- class -----------------
  user:User = {
    id:null , 
    username:'',
    email:'',
    password:'',
    phone:'',
    address:{
    city:'0',
    country:'0',
    addressDet:''
    },
    role:"ROLE_USER",
    active:0,
    card:false
  } 
  email:Email={
    to:this.user.email,
    subject:'Hi man',
    body:`
    Welcome in Our Application <br> 3lafyn is an application to make your life more easy <hr>
    please Enter this code ` + +` to create new Account .<br><br>
    Thanks for using our Application.:) 
    `
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
  // -------------------- Methodes
  constructor(private userService:UserService , private router:Router , private http:HttpClient , private chatMessageService:ChatMessageService) { }

  ngOnInit(): void {
  }

  
  cities: Array<any>;
  changeCountry(count) {
    this.cities = this.countryList.find(con => con.name == count).cities;
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }

  next(){
    this.page = !this.page;
  }
  
  createAccount(user){
    this.sendEmail();
    this.theCode = this.makeRandom(this.lengthOfCode, this.possible);
    console.log(this.theCode);
    if(this.sendEmail()){
      this.showImage=true;
    }
  }

  
  sendEmail(){
    this.email.to=this.user.email;
    this.userService.sendEmail(this.email).subscribe(data => {
      
    })
    return true;
  }

  public onFileChanged(event){
    this.selectedFile = event.target.files[0];
    this.upload();
  }
  
  public upload(){
    this.load = true;
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile' , this.selectedFile , this.user.email);
    this.http.post(`https://alafyn20.herokuapp.com/upload` , uploadImageData , {observe:'response'}).subscribe(data => {
      if(data.status === 200){
        this.getImage();
      }else{
        this.imp = false;
        this.load = false ;
      }
    });
  }

  removeImage(name){
      this.http.delete(`https://alafyn20.herokuapp.com/deleteImage/${name}.jpg`).subscribe(data => {
        this.reterviedImage = null;
      })
    }
  
  getImage(){
    this.http.get(`https://alafyn20.herokuapp.com/get/${this.user.email}`).subscribe(res => {

        this.retriveRespons = res;
        this.base64Data = this.retriveRespons.picBytes;
        this.reterviedImage = 'data:image/jpeg;base64,'+this.base64Data;
        this.imp = true;
        this.load = false ;
      } ,error => {
        this.reterviedImage='';
      });
    }

  showcode(){
    this.showImage = false;
    this.showCode = true;
  }

  getUser(){
      this.userService.getUser(this.user.email).subscribe(data => {  
      });
  }


  saveAccount(){
    console.log(this.theCode);
    if(this.code === this.theCode){
      this.user.address.addressDet = this.user.address.addressDet +" "+ this.user.address.city+" " + this.user.address.country;
      this.showCode = false ;
      this.userService.createUser(this.user).subscribe(data => {
        this.sendNotification();
        this.error=true;
        setTimeout(() => {
          this.error=false;
          this.router.navigate(['/login']);
        }, 5000);
      });
     }else{
       this.removeImage(this.user.email);
      this.MyMessage= "This Email Or This Phone is exit";
     }
  }

  sendNotification(){
    this.notifcation.content = this.user.username + " create new Account. Please Check this Account's Data !";
    console.log(this.notifcation.rec)
    this.notifcation.sender = this.user.email;
    this.notifcation.accept= null;
    this.chatMessageService.addNotifications(this.notifcation).subscribe(data => {

    });
  }

}


