import { RestService } from "./../rest.service";
import { Location } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { CancelbookPage } from "../cancelbook/cancelbook.page";

// import * as moment from "moment";
import { format, parse, parseISO } from "date-fns";

@Component({
  selector: "app-myreservations",
  templateUrl: "./myreservations.page.html",
  styleUrls: ["./myreservations.page.scss"],
})
export class MyreservationsPage implements OnInit {
  segmentModel = "Upcoming";
  deleteOldBooking = false;
  upcomingArr: any = [];
  orderd_upcomingArr: any = [];
  previousArr: any = [];
  orderd_previousArr: any =[];

  userdata: any = "";
  userID: any = "";
  bookingToDeleteId: any = "";

  constructor(
    public location: Location,
    public modalCtrl: ModalController,
    public rest: RestService,
    public router: Router,
    public changeDetectorRef:ChangeDetectorRef
  ) {}

  ngOnInit() {}
  
  ionViewWillEnter() {
    this.segmentModel = 'Upcoming';
    this.userdata = localStorage.getItem("userdata");
    this.userID = JSON.parse(this.userdata).users_customers_id;
    this.getUpcomingBookings();
  }

  segmentChanged(event: any) {
    console.log(this.segmentModel);
    console.log("eee", event);
  }

  closeModel(){
    this.deleteOldBooking = false;
    this.changeDetectorRef.detectChanges();
  }

  deleteReservation(id:any){
    this.deleteOldBooking = true;
    this.bookingToDeleteId = id;
  }

  delOldBooking(){
    let data = {
      venues_bookings_id:this.bookingToDeleteId
    };
    this.rest.presentLoader();
    this.rest.sendRequest('delete_booking',data).subscribe((res: any) => {
      this.rest.dismissLoader();
      console.log("delete_booking",res);
      if(res.status == 'success'){
        this.getPreviousBookings();
        this.deleteOldBooking = false;
      }
    });
  }

  getUpcomingBookings(){
    if(this.orderd_upcomingArr.length == 0){
      this.rest.presentLoader();
    }
    var ss = JSON.stringify({
      users_customers_id: this.userID,
    });

    this.rest.bookings_upcoming(ss).subscribe((res: any) => {
      console.log("bookings_upcoming------", res);
      if(this.orderd_upcomingArr.length == 0){
        this.rest.dismissLoader();
      }
      if (res.status == "success") {
        this.upcomingArr = res.data;
        for(let i= this.upcomingArr.length-1, j=0; i>=0; i--){
          this.orderd_upcomingArr[j] = this.upcomingArr[i];
          j++;        
        }
        console.log("orderd_upcomingArr: ",this.orderd_upcomingArr);
        
      }
    });

  }

  getPreviousBookings(){
    this.orderd_previousArr = [];
    if(this.orderd_previousArr.length == 0){
      this.rest.presentLoader();
    }
    var ss = JSON.stringify({
      users_customers_id: this.userID,
    });

    this.rest.bookings_previous(ss).subscribe((res: any) => {
      console.log("bookings_previous------", res);
      if(this.orderd_previousArr.length == 0){
        this.rest.dismissLoader();
      }
      if (res.status == "success") {
        this.previousArr = res.data;
        for(let i= this.previousArr.length-1, j=0; i>=0; i--){
          this.orderd_previousArr[j] = this.previousArr[i];
          j++;        
        }
        console.log("orderd_previousArr: ",this.orderd_previousArr);
      }
    });
  }

  gotoBookingDetails(data:any){
    // console.log('this.rest.selectedBooking: ',this.rest.selectedBooking);
    // console.log(data);
    this.rest.selectedBooking = data;
    this.rest.selectedBooking.coming_from = 'reservations'; 
    this.rest.detail = this.rest.selectedBooking.venues_details;
    this.rest.comingFrom = 'reservations';
    console.log('this.rest.selectedBooking: ',this.rest.selectedBooking);
    console.log("comingFrom     ::::::",this.rest.comingFrom);
    
    this.router.navigate(['/booking-detail']);
  }

 
  goBack() {
    if(this.rest.comfrom == 'booking2'){
      this.router.navigate(['/home']);
      this.rest.comfrom = '';
    }else{
      this.router.navigate(['/profile']);
    }
  }

  async cancelBooking(aa: any) {
    this.rest.selectedBooking = aa;
    console.log("model");
    this.rest.comingFrom = "myreservation";
    const modal = await this.modalCtrl.create({
      component: CancelbookPage,
      cssClass: "riz",
    });
    modal.onDidDismiss().then((data) => {
      console.log("aaaaaaaaaaaaaa");
      this.ionViewWillEnter();

      const user = data["data"]; // Here's your selected user!
    });

    await modal.present();
  }

  getDate(aa: any) {
    return format(new Date(aa) ,"E, do MMM");
  }
  getTime(aa:any){
    // return aa.substring(0,5);
     aa = parse(aa, 'HH:mm:ss', new Date());
    return aa = format(aa, 'h:mmaaa');
  }

  editbooking(aa: any) {
    this.rest.selectedBooking = aa;
    this.router.navigate(["editbooking"]);
  }
}
