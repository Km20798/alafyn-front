import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Email } from 'src/app/models/Email.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

//--------------------------  Attributes ----------------------- 
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
  cities: Array<any>;
  possible = "1234567890";
  lengthOfCode = 6;
  conPass:string;
  active:boolean=false;
  message:boolean = false;
  error:boolean=false;
  code:string;
  showCode:boolean=false;
  theCode:string;
  page:number=1;
  // image
  myMessage:string='';
  show:boolean=true;
  imageName:any;
  selectedFile:File;
  reterviedImage:any;
  reterviedImage2:any;
  reterviedImage3:any;
  reterviedImage4:any;
  base64Data:any; 
  retriveRespons:any;
  imp:boolean=false;
  img1:boolean = false;
  img2:boolean = false;
  img3:boolean = false;
  img4:boolean = false;
  personalImage:any;
  showImagePerson:boolean = false;
  impPerson:boolean = false;
  codev:number;
  //----------------- classes  ----------------------
  user:User = {
    id:null , 
    username:'',
    email:'',
    password:'',
    phone:'',
    address:{
    city:'',
    country:'0',
    addressDet:''
    },
    role:"ROLE_USER",
    active:0
  }
  email:Email={
    to:this.user.email,
    subject:'Hi man',
    body:`
    Welcome in Our Application.
    3lafyn is an application to make your life more easy 
    ----------------------------------------------------
    please Enter this code ` + this.codev +` to Update Your Password .
    Thanks for using our Application.:) 
    `
  }
  //--------------------------- Methods -------------------------- 

  constructor(private userService:UserService , private router:Router , private http:HttpClient) { }

  ngOnInit(): void {
  }

  changeCountry(count) {
    this.cities = this.countryList.find(con => con.name == count).cities;
  }

  next(){
      this.page+=1;
  }
  back(){
    this.page-=1;
  }

  showcode(){
    this.showImagePerson = false ;
    this.showCode=true;
  }

  makeRandom(lengthOfCode: number, possible: string) {
    console.log("start");
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.codev = Number(text);
    console.log(text);
    return text;  
  }
   
  getCompanyImage(){
    if(this.sendEmail()){
      this.showImagePerson = true ;
    }
  }
  
  sendEmail(){
    this.email.to=this.user.email;
    this.makeRandom(this.lengthOfCode , this.possible);
    this.userService.sendEmail(this.email).subscribe(data => {});
    return true;
  }

  saveAccount(){
    console.log("fuck you man");
    console.log(this.codev);
    console.log(this.code);
    if(Number(this.code) === Number(this.codev)){
      this.showCode = false ;
      this.user.role = 'ROLE_STORE';
      this.userService.createUser(this.user).subscribe(data => {
        this.user = data;
        this.error=true;
        setTimeout(() => {
          this.error=false;
          this.router.navigate(['/login']);
        }, 5000);
      });
    }else{
      this.code = null ;
    }
  }

  public onFileChanged(event , name:string){
    this.selectedFile = event.target.files[0];
    this.upload(name);
  }

  public upload(name:string){
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile' , this.selectedFile , this.user.email+name);

    this.http.post(`http://localhost:8081/upload` , uploadImageData , {observe:'response'}).subscribe(data => {
      if(data.status === 200){
        if(name === "card-front"){  
          this.img1 = true;
        }else if(name === "card-back"){
          this.img2 = true;
        }else if(name === "record-front"){
          this.img3 = true;
        }else if(name === "record-back"){
          this.img4 = true;
        }else if(name === ''){
          this.impPerson = true;
        }
        this.imp = false;
        this.getImage(name);
      }else{
        alert("Error in upload")
      }
    });
  }
  
  getImage(name:String){
    this.http.get(`http://localhost:8081/get/${this.user.email}${name}`).subscribe(res => {
        this.retriveRespons = res;
        this.base64Data = this.retriveRespons.picBytes;
        if(name === "card-front"){
          this.reterviedImage = 'data:image/jpeg;base64,'+this.base64Data;
        }else if(name === "card-back"){
          this.reterviedImage2 = 'data:image/jpeg;base64,'+this.base64Data;
        }else if(name === "record-front"){
          this.reterviedImage3 = 'data:image/jpeg;base64,'+this.base64Data;
        }else if(name === "record-back"){
          this.reterviedImage4 = 'data:image/jpeg;base64,'+this.base64Data;
        }else if(name === this.user.email){
          this.personalImage = 'data:image/jpeg;base64,'+this.base64Data;
        }
        
      } ,error => {
        this.reterviedImage='';
      });
    }

}
