
import { Component, OnInit, Input, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute,Params } from '@angular/router';

declare var google: any;



@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  providers: [UserService],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SearchResultsComponent implements OnInit {
  public rate: number = 0;
  users: Array<Object> = [];
  pattern: string="";
  searchMethod: string = "name";
  initialFilters = ["Computer", "Internet", "Phone", "TV", "Printer", "Other"];
  customFilters = []
  filterActive = false
  computerActive = false
  internetActive = false
  phoneActive = false
  tvActive = false
  printerActive = false
  otherActive = false
  filters: Array<String> = []
  place: Object;
  lat: any;
  lng: any;
  address: any;


  constructor(
    private userService: UserService,
    private ngZone: NgZone,
    private route: Router,
    private router: ActivatedRoute,
    private _changeDetectionRef : ChangeDetectorRef

  ) { }

  ngOnInit() {
    this.router.queryParams.subscribe((queryParams)=> {
      this.address = queryParams['place']
      this.lat = parseFloat(queryParams['lat']);
      this.lng = parseFloat(queryParams['lng']);
      let homefilters = queryParams['filters'].split(",");
      if(homefilters.length != 0 &&  homefilters[0] != ''){
        this.filters = homefilters;
        this.customFilters = this.filters
        this.filters.forEach((checkbox)=>{
          if(checkbox === 'Computer'){
            this.computerActive = true;
          }
          else if(checkbox === 'Internet'){
            this.internetActive = true;
          }
          else if(checkbox === 'Phone'){
            this.phoneActive = true;
          }
          else if(checkbox === 'TV'){
            this.tvActive = true;
          }
          else if(checkbox === 'Printer'){
            this.printerActive = true;
          }
          else if(checkbox === 'Other') {
            this.otherActive = true;
          }
        })

      } else {
          this.filters = this.initialFilters;
      }
    })

    this.getUsers();
    let input = document.getElementById('searchLocation');
    let autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener("place_changed", ()=>{
      this.ngZone.run(()=>{
        this.lat = autocomplete.getPlace().geometry.location.lat()
        this.lng = autocomplete.getPlace().geometry.location.lng();
        this.getUsers()
      })
    })

  }

  getUsers() {
    let infowindow = new google.maps.InfoWindow
    this.userService.getUsers(this.lat, this.lng)
    .subscribe((users) => {
      this.users = users;
      // this.route.navigate(['search'], {queryParams: {lat: this.lat, lng: this.lng, filters: this.filters}})
      let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: this.lat, lng: this.lng},
        scrollwheel:false,
      });

      map.addListener('dragend', ()=> {
        this.ngZone.run(()=>{
        this.lat = map.center.lat()
        this.lng = map.center.lng();
        this.getUsers()
          })
      })

    users.forEach((marker) => {
      if (marker.role === "HELPER") {
        this.filters.forEach(function(filter){
          (marker.speciality).forEach(function(speciality){
            if(speciality === filter){
              let title = marker.name
              let position = {
                lat: marker.location.coordinates[1],
                lng: marker.location.coordinates[0]
              };
              // let test = '<div style="background-color:blue; width:100px;  heigth:50px;">' + marker.name +'</div>'
              // let test2 = "test"
              let pin = new google.maps.Marker({ position, map, title});
                  pin.setIcon("http://localhost:3000/icons/map-icon.png")

                  let total = 0;
                marker.reviews.forEach(function(review){
                    total += review.rating
                })
                let average = total / marker.reviews.length
                let averageNumber = parseInt(average.toFixed(1))
                let contentString ='<div class="pin-google"><div class="col-md-5"><img src="' + marker.profilePic + '" class="img-responsive img-circle" style="width:80px; height:auto;"><button class="btn btn-primary" ><a style="text-decoration:none; color:white;" href="/search/' + marker._id + '">Contact</a></button></div><div class="col-md-7"><h5 style="color: #286090 ">' + marker.name + '</h5>'  + '<h5>€' + "15" + '/hour</h5>' + '<h5>' + marker.slogan + '</h5>' + '</div></div>';
                      google.maps.event.addListener(pin, 'click', function() {
                         infowindow.setContent(contentString);
                         infowindow.open(map, this);
                        });
            }
          })
        })
      }
    });
  });
};

  addFilters(event){

    this.filterActive = true
    this.customFilters.push(event.target.value)
    this.filters = this.customFilters
    this.getUsers()
  }


  removeFilters(event){

    this.filterActive = false;
    let index = this.filters.indexOf(event.target.value)
    this.filters.splice(index, 1)
    if(this.customFilters.length == 0){
      this.filters = this.initialFilters
    }
    this.getUsers()
  }

  totalScore(user) {
    if(user.reviews.length === 0) {
      return   this.rate = 0
    }
    else {
    let total = 0;
    for (let i = 0; i < user.reviews.length; i++ ){
      total += user.reviews[i].rating
    }
    let average = total / user.reviews.length
    this.rate = parseInt(average.toFixed(1))
    return parseInt(average.toFixed(1))

}

}
}
