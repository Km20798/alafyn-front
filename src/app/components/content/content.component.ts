import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  //-------------------------- Attributes ----------------------

  //--------------------- Attribute --------------------

  latitude: 51.678418;
  longitude: 7.809007;
  message:string;
  okay:boolean=false;
  //------------------- class ------------------- 
  mes:Message= {
    id:null,
    username:'' ,
    email:'',
    message:'',
    date:new Date()
  };
  
  // -------------------------------  Methods ------------------------

  constructor(private service:MessageService , private router:Router) { }

  ngOnInit(): void {
  }

  Warn() {
    alert ("Your Message is sent successfully");
 }

  onSubmit(){
    this.service.addMessage(this.mes).subscribe(data => {
      this.Warn();
    }, error => {
      this.message = 'please Enter your data !';
    });
   
  }

  

}
