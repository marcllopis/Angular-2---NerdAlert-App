import { Component, OnInit } from '@angular/core';
import { FileUploader } from "ng2-file-upload";
import { SessionService } from '../session.service';
import { Router } from '@angular/router';
declare const google: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;
  uploader: FileUploader = new FileUploader({
    url: `http://localhost:3000/edit`,

    authToken: `JWT ${this.session.token}`
  });

  newUser = {
    _id: '',
    name: '',
    surname: '',
    email: '',
    address: '',
    lat: '',
    long: '',
    role: '',
    phoneNumber: '',
    description: '',
    slogan: '',
    status: '',
    speciality: '',
  };

  feedback: string;

  isAuth: boolean;


  constructor(
    private session: SessionService,
    private router:  Router
  ) {

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
    let input = document.getElementById('searchTextField');
    let autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener("place_changed", ()=> {

    this.newUser.lat =  autocomplete.getPlace().geometry.location.lat()
    this.newUser.long   = autocomplete.getPlace().geometry.location.lng();
    this.newUser.address = autocomplete.getPlace().formatted_address

    })

    this.user = JSON.parse(localStorage.getItem("user"))
    let user = JSON.parse(localStorage.getItem("user"))
    this.newUser._id = user._id
    this.newUser.name = user.name
    this.newUser.surname = user.surname
    this.newUser.email = user.email
    this.newUser.address = user.address
    this.newUser.long = user.location.coordinates[0]
    this.newUser.lat = user.location.coordinates[1]
    this.newUser.role = user.role




    this.uploader.onSuccessItem = (item, user) => {
      localStorage.removeItem("user")
      localStorage.setItem("user", user)

      // this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };

  }

  submit() {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('name', this.newUser.name);
      form.append('surname', this.newUser.surname);
      form.append('email', this.newUser.email);
      form.append('address', this.newUser.address);
      form.append('role', this.newUser.role);
      form.append('lat', this.newUser.lat);
      form.append('long', this.newUser.long);
      form.append('_id', this.newUser._id);
      form.append('phoneNumber', this.newUser.phoneNumber);
      form.append('slogan', this.newUser.slogan);
      form.append('description', this.newUser.description);
      form.append('status', this.newUser.status);
      form.append('speciality', this.newUser.speciality);
        console.log('profile2')
    };

    this.uploader.uploadAll();
      console.log('profile3')
  }


}
