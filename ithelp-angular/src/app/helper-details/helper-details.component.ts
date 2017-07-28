import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-helper-details',
  templateUrl: './helper-details.component.html',
  styleUrls: ['./helper-details.component.css'],
  providers: [UserService]
})
export class HelperDetailsComponent implements OnInit {
  public rate: number = 0;
	user: any = {};
  customer: any ={};
  field: any;
  reviews: Array<Object> = [];

  newBooking = {
     date: '',
     starttime: '',
     mainSubject: '',
     subSubject: '',
     issue: '',
     message: '',
     customer: '',
     helper: ''
   };

  constructor(
  	private router: Router,
  	private route: ActivatedRoute,
    private userService: UserService,
    private ngZone: NgZone
  ) {

  }

  ngOnInit() {
    console.log("route", this.route)
  	this.route.params.subscribe(params => {
      this.getUserDetails(params['id']);
    });

  }

  getUserDetails(id) {

    // this.newBooking.customer = this.customer
    this.userService.get(id)
      .subscribe((user) => {
        this.user = user.Users;
        this.reviews = user.reviewHelper
        console.log("user in getDetails: ", user)
          console.log("user in getDetails: ", this.user.reviews.length)
        if(this.user.reviews.length === 0) {
          return   this.rate = 0
        }
        else {
        let total = 0;
          console.log("user in getDetails: ", this.user)
        for (let i = 0; i < this.user.reviews.length; i++ ){
          total += this.user.reviews[i].rating
        }
          console.log("user in getDetails: ", this.user.reviews.length)
        let average = total / this.user.reviews.length
        this.rate = parseInt(average.toFixed(1))
        console.log("LENGTH: ", this.user.reviews.length)
        return parseInt(average.toFixed(1))

    }
      });






  }

  showField(field){
    this.field = field
    this.ngZone.run(()=>{})
  }


    booking() {
      this.customer = JSON.parse(localStorage.getItem("user"))
      this.newBooking.helper = this.user._id
      this.newBooking.customer = this.customer._id
    	this.userService.booking(this.newBooking)
        .subscribe(result => {
            if (result === true) {
                // login successful

                console.log('result ok', result);
                this.router.navigate(['/inbox']);
            } else {
            		console.log('result ko', result);
                  this.router.navigate(['/inbox']);
                // login failed
                // this.error = 'Username or password is incorrect';
            }
        });

    }


}
