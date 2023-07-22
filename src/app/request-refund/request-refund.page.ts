import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RestService } from '../rest.service';
@Component({
  selector: 'app-request-refund',
  templateUrl: './request-refund.page.html',
  styleUrls: ['./request-refund.page.scss'],
})
export class RequestRefundPage implements OnInit {
  ticketRequested = 0;
  availableTickets: any;
  userdata:any;
  userId:any;
  constructor(public location:Location,
    public rest:RestService) {
    
   }

  ngOnInit() {
    if(this.rest.billDetails.ticket_requested){
      this.availableTickets = this.rest.billDetails.ticket_requested;
      console.log(this.availableTickets);
      
    }
  }

  ionViewWillEnter() {
    this.userdata = localStorage.getItem('userdata');
    this.userId = JSON.parse(this.userdata).users_customers_id;
  }

  getTicketCount(ev:any){
    
      if(ev.target.value > this.availableTickets){
        ev.target.value = '';
        console.log("ev.target.value",ev.target.value);
        this.rest.presentToast(`Max available tickets are ${this.availableTickets}.`);
      }else{
        this.ticketRequested=ev.target.value
      }  
    
    console.log("tickets requested", this.ticketRequested);
    
    
  }

  requestRefund(){
    if(this.ticketRequested<=0){
      this.rest.presentToast('Plz enter number of ticket/tickets');
    }else{
      console.log("users_customers_id:",this.userId);
      console.log("event_booking_id:",this.rest.eventBookingId,);
      console.log("events_id:", this.rest.eventId);
      // let data = {
      //   users_customers_id:this.userId,
      //   event_booking_id:this.rest.eventBookingId,
      //   events_id: this.rest.eventId
      // }
      // console.log("Refund Req Payload: ",data);
      
      // this.rest.presentLoaderWd();
      // this.rest.sendRequest('request_refund',data).subscribe((res:any)=>{
      //   this.rest.dismissLoader();
      //   console.log("Refund Request Res: ", res);
      //   if(res.status== 'success'){
      //     this.rest.presentToast('Refund Request Sent.');
      //     setTimeout(() => {
      //       // this.navCtrl.navigateRoot(['/home']);
      //     }, 1000);
      //   }else if(res.status == 'error'){
      //     console.log(res);
          
      //   }
        
      // })
    }
    
  }
  goBack(){
    this.location.back();
  }
}
