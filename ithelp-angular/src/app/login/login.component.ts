import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  error: string;

  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.session.login(this.user)
				        .subscribe(result => {
				            if (result === true) {
			                // login successful
			                this.router.navigate(['/']);
			         			} else {
			                // login failed
			                this.error = 'Email or password is incorrect';
				            }
				        });
  }

}
