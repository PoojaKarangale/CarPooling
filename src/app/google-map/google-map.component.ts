import { Component, OnInit, ViewChild } from '@angular/core';

//declare const google:any;
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
 
  @ViewChild("map") SVGFEDisplacementMapElement;
  map: any;
  
  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    let coords = new google.maps.LatLng(25, 400);
    let mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }


    this.map = new google.maps.Map(this.SVGFEDisplacementMapElement.nativeElement, mapOptions)

    let Marker: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      position: coords
    })


  }
}
