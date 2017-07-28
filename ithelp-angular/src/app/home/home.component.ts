import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { TestservService } from '../services/testserv.service';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [TestservService]
})
export class HomeComponent implements OnInit {
  searchMethod: string = "name";
  initialFilters = ["Hardware", "Software", "Internet", "Phones", "Services", "Teaching"];
  customFilters = []
  filterActive = false
  filters: Array<String> = []
  place: any;

  constructor(
    private session: SessionService,
    private router: Router,
    private testService: TestservService
  ) {}

  ngOnInit() {
    let input = document.getElementById('search');
    let autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener("place_changed", ()=> {
        this.place = autocomplete.getPlace()
        console.log(this.place)
    })
  }

  addFilters(event){
    this.filterActive = true
    this.customFilters.push(event.target.value)
    this.filters = this.customFilters
          console.log(this.filters)
  }

  removeFilters(event){
    this.filterActive = false;
    let index = event.target.value.indexOf(this.customFilters)
    this.customFilters.splice(index, 1)
    if(this.customFilters.length == 0){
      this.filters = this.initialFilters

    }
          console.log(this.filters)
  }

  goToSearch(){
    let lat = this.place.geometry.location.lat();
    let lng = this.place.geometry.location.lng();
    let filters;
  if(this.filters.length === 0) {
     filters = ''
  } else {
     filters = this.filters.toString()
  }
    this.router.navigate(['search'], {queryParams: {lat: lat, lng: lng, place: this.place.formatted_address, filters: filters}})
  }

}
