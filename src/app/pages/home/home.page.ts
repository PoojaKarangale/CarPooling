import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, PopoverController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Todo, TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { NativeGeocoderOptions, NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  address: string;

  constructor(private nav: NavController,
    private todoService: TodoService,
    private modalCtr: ModalController,
    private route: ActivatedRoute,
    private popoverCtrl: PopoverController,
    private loadingController: LoadingController,
    private router: Router,

    public loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) {
  }
  ngOnInit() {
    this.loadMap();
  }

  goInfoPost() {
    this.router.navigate(['info-post']);
  }
  goInfoSearch() {
    this.router.navigate(['info-search']);
  }



  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('tilesloaded', () => {
        console.log('accuracy', this.map);
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
      });

  }



}
