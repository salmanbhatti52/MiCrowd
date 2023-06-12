import { CancelReservationPageModule } from "./cancel-reservation/cancel-reservation.module";
import { PaymentmethodPageModule } from "./paymentmethod/paymentmethod.module";
import { FilterPageModule } from "./filter/filter.module";
import { CancelbookPageModule } from "./cancelbook/cancelbook.module";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { OneSignal } from "@awesome-cordova-plugins/onesignal/ngx";
import { Geolocation } from "@awesome-cordova-plugins/geolocation/ngx";
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from "@awesome-cordova-plugins/native-geocoder/ngx";
import { InAppBrowser } from "@awesome-cordova-plugins/in-app-browser/ngx";
import { PininfoPageModule } from "./pininfo/pininfo.module";
// import { LottieSplashScreen } from "@awesome-cordova-plugins/lottie-splash-screen/ngx";

import { SignInWithApple } from "@awesome-cordova-plugins/sign-in-with-apple/ngx";
import { BeseenPageModule } from "./beseen/beseen.module";

import { NgScrollCalendarModule } from "ng-scroll-calendar";

import { DatePicker } from "@ionic-native/date-picker/ngx";
// import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    PininfoPageModule,
    BeseenPageModule,
    NgScrollCalendarModule,
    CancelbookPageModule,
    FilterPageModule,
    PaymentmethodPageModule,
    CancelReservationPageModule,
  ],
  providers: [
    SignInWithApple,
    OneSignal,
    DatePicker,
    // BarcodeScanner,
    // Geolocation,
    // LottieSplashScreen,
    InAppBrowser,
    NativeGeocoder,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
