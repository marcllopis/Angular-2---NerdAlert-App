import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';
// import { UserService } from '../user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
  // providers: [UserService]
})
export class NavbarComponent implements OnInit {
  isAuth: boolean;
  user: Object = {};
  booking: any = {};
  // inboxCounterCustomer: any;


  constructor(
  	private session: SessionService,
  	private router:  Router
    // private userService: UserService
  ) {
    this.user = JSON.parse(localStorage.getItem("user"))
    console.log("USER",this.user)
    console.log(this.session)
    this.session.isAuth
        .subscribe((isAuth: boolean) => {
        // user will be false if logged out
        // or user object if logged in.
          this.isAuth = isAuth;
        });
    if (this.session.token) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }

  ngOnInit() {
    console.log("This is the user on navbar before parse",this.user)
    this.user = JSON.parse(localStorage.getItem("user"))
    console.log("This is the user in the navbar after parse",this.user)

    let user = JSON.parse(localStorage.getItem("user"))
      console.log(localStorage)
    // this.userService.inbox(user._id)
    //     .subscribe((response) => {
    //         this.booking = response;
    //         console.log(this.booking)
    //         console.log(this.booking.bookingCustomer[0].mainSubject)

            // this.booking.bookingCustomer.filter((booking) => {
            //   if (booking.acceptedByHelper === false && booking.declinedByHelper === false && booking.acceptedByCustomer === false ){
            //     this.inboxCounterCustomer = true;
            //   }
            // });
        // })




  }

  logout() {
  	this.session.logout();
  	// this.router.navigate(['/login']);
  }
}
