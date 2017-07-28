import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PhoneService } from '../phone.service';

@Component({
  selector: 'app-phone-details',
  templateUrl: './phone-details.component.html',
  styleUrls: ['./phone-details.component.css'],
  providers: [PhoneService]
})
export class PhoneDetailsComponent implements OnInit {
	phone: any;
  constructor(
  	private router: Router,
  	private route: ActivatedRoute,
    private phoneService: PhoneService
  ) {}

  ngOnInit() {
  	this.route.params.subscribe(params => {
      this.getPhoneDetails(params['id']);
    });
  }

  getPhoneDetails(id) {
    this.phoneService.get(id)
      .subscribe((phone) => {
        this.phone = phone;
      });
  }

  deletePhone() {
  	if (window.confirm('Are you sure?')) {
    	this.phoneService.remove(this.phone._id)
      .subscribe(() => {
        this.router.navigate(['']);
      });
  	}
	}
}
