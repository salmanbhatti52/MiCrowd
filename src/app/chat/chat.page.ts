import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import {
  NavController,
  AlertController,
  LoadingController,
  ModalController,
} from "@ionic/angular";

import { Component, OnInit, ViewChild } from "@angular/core";
import { IonContent, Platform, PopoverController } from "@ionic/angular";
import { RestService } from "../rest.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"],
})
export class ChatPage implements OnInit {
  matchpopupHidden = true;
  popupSelectedVal: any;

  @ViewChild("IonContent", { static: true })
  content!: IonContent;
  checkType = "chatList";
  authToken: any;
  senderUserName: any;

  showSkeleton = true;
  noChatlistFlag = false;
  allMessages: any = [];
  currentUser: any;
  currentTime: string = "";
  user_input: string = "";
  // chatImagesArray = [];
  private autoSaveInterval: any;
  userIMG: any;

  remainingSMS = 0;

  uu: any = "";
  user: any = "";
  detailObj: any = "";

  userdata: any = "";
  userID: any = "";
  previousMsgsCount: any;
  NewMsgsCount: any;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    public restService: RestService,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private location: Location,
    public platform: Platform
  ) {
    this.userdata = localStorage.getItem("userdata");
    this.currentUser = JSON.parse(this.userdata).users_customers_id;

    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log("Handler was called!");
    });
  }

  ngOnInit() {}

  goBack() {
    this.location.back();
  }

  showPopup(val: any) {
    this.matchpopupHidden = false;
    console.log(val);
    this.popupSelectedVal = val;
  }

  hidePopup() {
    this.matchpopupHidden = true;
  }

  goToMemberShip() {
    this.hidePopup();
    this.router.navigate(["smspkg"]);
  }

  ionViewWillEnter() {
    this.userdata = localStorage.getItem("userdata");
    this.userID = JSON.parse(this.userdata).users_customers_id;

    this.detailObj = this.restService.detail;
    console.log("Detail Object: ",this.detailObj);
    
    // Get all  messages....
    this.getMessages(this.userID);
    this.autoSaveInterval = setInterval(() => {
      // this.updateMessages();
      this.getMessagesAgain(this.userID)
    }, 3000);
  }
  ionViewWillLeave() {
    clearInterval(this.autoSaveInterval);
    console.log("clear");
    this.restService.comingFrom = ''
  }
  userTyping(event: any) {
    this.scrollDown();
  }

  changeFunction(ev: any) {}
  updateMessages() {
    // geting all chats Messages
    var data = JSON.stringify({
      requestType: "updateMessages",
      users_customers_id: this.userID,
      other_users_customers_id: this.detailObj.users_business_id,
    });
    console.log("datttttttaaaaaaaaaaaa-----", data);
    this.restService.user_chat(data).subscribe(
      async (res: any) => {
        this.showSkeleton = false;
        if (res.status == "success") {
          let unread_messages = res.data.chat_messages;
          // this.allMessages = res.data.chat_messages;
          let chatLength = res.data.chat_messages;
          console.log("receving All chats unread messages", unread_messages);
          if (unread_messages.length > 0) {
            if (chatLength != unread_messages.length) {
              for (var i = 0; i < unread_messages.length; i++) {
                this.allMessages.push({
                  userId: unread_messages[i].userId,
                  time: unread_messages[i].time,
                  message: unread_messages[i].message,
                  msgType: unread_messages[i].msgType,
                });
              }
              this.scrollDown();
            }
          }
          this.noChatlistFlag = false;
        } else {
          this.noChatlistFlag = true;
        }
      },
      (err) => {
        this.restService.dismissLoader();
        this.restService.presentToast("Network error occured");
      }
    );
  }
  getMessages(senderUserID: any) {
    console.log("logged in user", this.currentUser);
    // geting all chats Messages
    if(this.restService.comingFrom == 'event-detail'){ 
      var data = JSON.stringify({
        requestType: "getMessages",
        users_customers_id: this.userID,
        other_users_customers_id: this.detailObj.events.users_business_id,
        events_id: this.detailObj.events.events_id
      });
      console.log("payload get event msgs", data);
      this.restService.event_chat(data).subscribe(
        async (res: any) => {
          this.showSkeleton = false;
          console.log("response", res);
  
          if (res.status == "success") {
            this.allMessages = res.data;
            this.scrollDown();
            this.previousMsgsCount = res.data.length
            console.log("receving All chats messages", this.allMessages);
            // this.allMessages.map((messages, index) => {
            //   if (messages.msgType == "attachment") {
            //     this.chatImagesArray.push({
            //       image: messages.message,
            //     });
            //   }
            // });
            // console.log("allMsg array ", this.chatImagesArray);
  
            this.noChatlistFlag = false;
          } else {
            this.noChatlistFlag = true;
          }
        },
        (err) => {
          this.restService.dismissLoader();
          this.restService.presentToast("Network error occured");
        }
      );
    }
    else if(this.restService.comingFrom == 'startChatWithAdmin'){
      var data = JSON.stringify({
        requestType:"getMessages",
        users_customers_id: this.userID,
        other_users_customers_id:this.restService.adminId
      });
      console.log("payload get admin msgs", data);
      this.restService.admin_chat(data).subscribe(
        async (res: any) => {
          this.showSkeleton = false;
          console.log("response", res);
  
          if (res.status == "success") {
            this.allMessages = res.data;
            this.scrollDown();
            this.previousMsgsCount = res.data.length
            console.log("receving All chats messages", this.allMessages);
            // this.allMessages.map((messages, index) => {
            //   if (messages.msgType == "attachment") {
            //     this.chatImagesArray.push({
            //       image: messages.message,
            //     });
            //   }
            // });
            // console.log("allMsg array ", this.chatImagesArray);
  
            this.noChatlistFlag = false;
          } else {
            this.noChatlistFlag = true;
          }
        },
        (err) => {
          this.restService.dismissLoader();
          this.restService.presentToast("Network error occured");
        }
      );
    }
    else{
      var data = JSON.stringify({
        requestType: "getMessages",
        users_customers_id: this.userID,
        other_users_customers_id: this.detailObj.users_business_id,
        venues_id: this.detailObj.venues_id
      });
      console.log("payload get venue msgs-------", data);

      this.restService.user_chat(data).subscribe(
        async (res: any) => {
          this.showSkeleton = false;
          console.log("response", res);
  
          if (res.status == "success") {
            this.allMessages = res.data;
            this.scrollDown();
            this.previousMsgsCount = res.data.length
            console.log("receving All chats messages", this.allMessages);
            // this.allMessages.map((messages, index) => {
            //   if (messages.msgType == "attachment") {
            //     this.chatImagesArray.push({
            //       image: messages.message,
            //     });
            //   }
            // });
            // console.log("allMsg array ", this.chatImagesArray);
  
            this.noChatlistFlag = false;
          } else {
            this.noChatlistFlag = true;
          }
        },
        (err) => {
          this.restService.dismissLoader();
          this.restService.presentToast("Network error occured");
        }
      );
    }
    


   
  }
  getMessagesAgain(senderUserID: any) {
    console.log("logged in user", this.currentUser);
    // geting all chats Messages
    if(this.restService.comingFrom == 'event-detail'){ 
      var data = JSON.stringify({
        requestType: "getMessages",
        users_customers_id: this.userID,
        other_users_customers_id: this.detailObj.events.users_business_id,
        events_id: this.detailObj.events.events_id
      });
  
      console.log("getAll Msg data again payload-------", data);
  
      this.restService.event_chat(data).subscribe(
        async (res: any) => {
          this.showSkeleton = false;
          console.log("response", res);
  
          if (res.status == "success") {
            this.NewMsgsCount = res.data.length;
            if(this.previousMsgsCount < this.NewMsgsCount){
              this.allMessages = res.data;
              this.previousMsgsCount = this.NewMsgsCount;
              console.log("receving All chats messages", this.allMessages);
              // console.log("allMsg array ", this.chatImagesArray);
              this.scrollDown();
            }
  
            this.noChatlistFlag = false;
          } else {
            this.noChatlistFlag = true;
          }
        },
        (err) => {
          this.restService.dismissLoader();
          this.restService.presentToast("Network error occured");
        }
      );
    }else if(this.restService.comingFrom == 'startChatWithAdmin'){
      var data = JSON.stringify({
        requestType:"getMessages",
        users_customers_id: this.userID,
        other_users_customers_id:this.restService.adminId
      });
      console.log("payload get admin msgs again", data);
      this.restService.admin_chat(data).subscribe(
        async (res: any) => {
          this.showSkeleton = false;
          console.log("response", res);
  
          if (res.status == "success") {
            
            this.NewMsgsCount = res.data.length;
            if(this.previousMsgsCount < this.NewMsgsCount){
              this.allMessages = res.data;
              this.previousMsgsCount = this.NewMsgsCount;
              console.log("receving All chats messages", this.allMessages);
              // console.log("allMsg array ", this.chatImagesArray);
              this.scrollDown();
            }
  
            this.noChatlistFlag = false;
          } else {
            this.noChatlistFlag = true;
          }
        },
        (err) => {
          this.restService.dismissLoader();
          this.restService.presentToast("Network error occured");
        }
      );
    }
    else{
      var data = JSON.stringify({
        requestType: "getMessages",
        users_customers_id: this.userID,
        other_users_customers_id: this.detailObj.users_business_id,
        venues_id: this.detailObj.venues_id
      });
  
      console.log("getAll Msg data-------", data);
  
      this.restService.user_chat(data).subscribe(
        async (res: any) => {
          this.showSkeleton = false;
          console.log("response", res);
  
          if (res.status == "success") {
            
            this.NewMsgsCount = res.data.length;
            if(this.previousMsgsCount < this.NewMsgsCount){
              this.allMessages = res.data;
              this.previousMsgsCount = this.NewMsgsCount;
              console.log("receving All chats messages", this.allMessages);
              // console.log("allMsg array ", this.chatImagesArray);
              this.scrollDown();
            }
            
            // this.allMessages.map((messages, index) => {
            //   if (messages.msgType == "attachment") {
            //     this.chatImagesArray.push({
            //       image: messages.message,
            //     });
            //   }
            // });
            
  
            this.noChatlistFlag = false;
          } else {
            this.noChatlistFlag = true;
          }
        },
        (err) => {
          this.restService.dismissLoader();
          this.restService.presentToast("Network error occured");
        }
      );
    }
    
  }

  back() {
    this.location.back();
    clearInterval(this.autoSaveInterval);
  }
  sendMsg() {
    console.log("remainong smssss---", this.remainingSMS);

      let msgToSend = this.user_input;
      this.user_input = "";
      
      this.sendMessage(parseInt(this.userID), msgToSend, "text");
    // }
  }
  scrollDown() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100);
  }

  sendMessage(senderUserID: any, msg: any, type: any) {
    // this.remainingSMS = this.remainingSMS - 1
    // localStorage.setItem('remainingSMS', this.remainingSMS.toString())
    if(this.restService.comingFrom == 'event-detail'){
      var data = JSON.stringify({
        requestType:"sendMessage",
        events_id:this.detailObj.events.events_id,
        sender_type:"Users",
        messageType:"text",
        users_customers_id:this.userID,
        other_users_customers_id:this.detailObj.events.users_business_id,
        content:msg
      });
      console.log("my msg in events", data);
      this.restService.presentLoader();
      this.restService.event_chat(data).subscribe(
        async (res: any) => {
          console.log("response0-0-0-0-0-0-0-0-0-0-0", res);
          this.getMessages(this.userID);
          this.restService.dismissLoader();
        },
        (err) => {
          this.restService.dismissLoader();
          this.restService.presentToast("Network error occured");
        }
      );
    }
    else if(this.restService.comingFrom == 'startChatWithAdmin'){
      var data = JSON.stringify({
        requestType:"sendMessage",
        sender_type:"Users",
        messageType:"1",
        users_customers_id:this.userID,
        other_users_customers_id:this.restService.adminId,
        content:msg
      });
      console.log("my msg in admin chat", data);
      this.restService.presentLoader();
      this.restService.admin_chat(data).subscribe(
        async (res: any) => {
          console.log("response0-0-0-0-0-0-0-0-0-0-0", res);
          this.getMessages(this.userID);
          this.restService.dismissLoader();
        },
        (err) => {
          this.restService.dismissLoader();
          this.restService.presentToast("Network error occured");
        }
      );
    }
    else{
      var data = JSON.stringify({
        requestType: "sendMessage",
        venues_id: this.detailObj.venues_id,
        sender_type: "Users",
        messageType: "1",
        users_customers_id: this.userID,
        other_users_customers_id: this.detailObj.users_business_id,
        content: msg,
      });
      console.log("my msg", data);
      this.restService.presentLoader();
      this.restService.user_chat(data).subscribe(
        async (res: any) => {
          console.log("response0-0-0-0-0-0-0-0-0-0-0", res);
          this.getMessages(this.userID);
          this.restService.dismissLoader();
        },
        (err) => {
          this.restService.dismissLoader();
          this.restService.presentToast("Network error occured");
        }
      );
    }

    

    
  }

  handleImgError(ev: any, item: any, url: any) {
    let source = ev.srcElement;
    // let imgSrc = `assets/imgs/placeholder.jpg`;

    let imgSrc = `assets/imgs/placeholder.jpg`;

    source.src = imgSrc;
  }
}
