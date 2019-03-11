import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Search, TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';

declare var google;

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  search: Search = {
    start: null,
    end: null,
    time: null,
    date:null,
     
  }
  searchId = null;

  
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  GoogleAutocomplete: any;
  autocomplete: { input: string; };
  autocomplete2: { input: string; };
  myLocation: any;
  autocompleteItems: any[];
  autocompleteItems2: any[];
  zone: any;
  geocoder: any;
  markers: any;
  geolocation: any;
  GooglePlaces: any;
  nearbyItems: any[];
  places: any;

  dec1: any
  dec2: any
  /*
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  */

constructor(private todoService: TodoService,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private loadingController: LoadingController,
    private nav: NavController) {
    this.geocoder = new google.maps.Geocoder;
    this.markers = [];
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.autocomplete2 = { input: '' };
    this.autocompleteItems2 = [];
  }


  ngOnInit() {
    this.searchId = this.route.snapshot.params['id'];
    if (this.searchId) {
      this.loadSearch();
    }
    this.updateSearchResults();
    this.updateSearchResults2();
  }

  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.ngZone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
    // this.selectSearchResult(item);
  }

  updateSearchResults2() {
    if (this.autocomplete2.input == '') {
      this.autocompleteItems2 = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete2.input },
      (predictions, status) => {
        this.autocompleteItems2 = [];
        this.ngZone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems2.push(prediction);
          });
        });
      });
    // this.selectSearchResult(item);
  }
  selectSearchResult(item) {
    // this.clearMarkers();
    this.autocompleteItems = [];
     this.search.start=item.description;
    //this.dec1=item;
   
  }

  selectSearchResult2(item) {
    // this.clearMarkers();
    this.autocompleteItems2 = [];
     this.search.end=item.description;
    //this.dec1=item;
    
  }
  async loadSearch() {
    const loading = await this.loadingController.create({
      message: ''
    });
    await loading.present();
    this.todoService.getSearch(this.searchId).subscribe(rec => {
      loading.dismiss();
      this.search = rec;
    });
  }
  async saveSearch() {
    const loading = await this.loadingController.create({
      message: ''
    });
    await loading.present();

    if (this.searchId) {
      this.todoService.updateSearch(this.search, this.searchId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/info-post');
      });
    } else {
      this.todoService.addSearch(this.search).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/info-post');
      });
    }

  }

  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
