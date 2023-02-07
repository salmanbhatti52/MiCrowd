import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-venue-popup',
  templateUrl: './select-venue-popup.page.html',
  styleUrls: ['./select-venue-popup.page.scss'],
})
export class SelectVenuePopupPage implements OnInit {
  venue_list:any;
  value: any;
  constructor(public modalCtrlr:ModalController) { }

  ngOnInit() {
    console.log("Receieved list:",this.venue_list);
    
  }

  selectedValue(ev:any){
    console.log(ev);
    this.value = ev.detail.value

  }

  sendValue(){
    return this.modalCtrlr.dismiss(this.value, 'value_sent');
  }

  dismiss(){
    this.modalCtrlr.dismiss();
  }
  
}
